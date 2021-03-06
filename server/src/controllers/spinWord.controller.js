/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable newline-after-var */
/* eslint-disable arrow-parens */
/**
 * Controller photo library category for project
 * author: Le khang
 * updater: ___
 * date up: 23/09/2019
 * date to: ___
 * team: BE-RHP
 */
const SpinWord = require("../models/SpinWord.model");
const SpinTheme = require("../models/SpinTheme.model");
const jsonResponse = require("../configs/response");
/**
 * Thư viện tách cụm từ từ trong câu
 */
const Chunking = require("vntk").chunking();

module.exports = {
  create: async (req, res) => {
    let newSpinWord;
    console.log('reqqqqqqqqqq', req.body)

    // check validate
    if (req.body.name === "") {
      return res.status(403).json({
        status: "fail",
        data: { title: "Tên từ khoá không được bỏ trống!" }
      });
    }

    // handle crete mongo
    newSpinWord = await new SpinWord({
      name: req.body.name,
      key: req.body.key,
      theme: req.body.theme
    });

    // Save mongodb
    await newSpinWord.save();

    return res.status(200).json(jsonResponse("success", newSpinWord));
  },
  index: async (req, res) => {
    let dataResponse;
    let queryResult = await SpinWord.find({})
      .populate({ path: "theme", select: "_id name description" })
      .limit(10);

    let entryCount = await SpinWord.count({});

    dataResponse = {
      data: queryResult,
      totalPages: Math.ceil(entryCount / 10)
    };
    res.status(200).json(jsonResponse("success", dataResponse));
  },
  indexOptions: async (req, res) => {
    let dataResponse;
    let searchKey = {};

    if (!req.body.currentPage) {
      req.body.currentPage = 1;
    }

    if (!req.body.pageSize) {
      req.body.pageSize = 10;
    }

    if (req.body.searchKey) {
      searchKey = {
        $or: [
          { name: new RegExp(req.body.searchKey.normalize(), "gi") },
          { key: new RegExp(req.body.searchKey.normalize(), "gi") }
        ]
      };
    }

    let pageSkipped = (req.body.currentPage - 1) * req.body.pageSize;

    let queryResult = await SpinWord.find(searchKey)
      .populate({ path: "theme", select: "_id name description" })
      .skip(pageSkipped)
      .limit(req.body.pageSize);

    let entryCount = await SpinWord.count(searchKey);

    dataResponse = {
      data: queryResult,
      currentPage: req.body.currentPage,
      totalPages: Math.ceil(entryCount / req.body.pageSize)
    };

    res.status(200).json(jsonResponse("success", dataResponse));
  },
  detail: async (req, res) => {
    let dataResponse = await SpinWord.findById(req.params.id)
      .populate({ path: "theme", select: "_id name description" })
      .lean();

    if (!dataResponse) {
      return res
        .status(404)
        .json(jsonResponse({ status: 404, data: "Không tìm thấy chủ đề!" }));
    }
    res.status(200).json(jsonResponse("success", dataResponse));
  },
  update: async (req, res) => {
    // Check validator
    if (req.body.title === "") {
      return res.status(403).json({
        status: "fail",
        data: { title: "Tên chủ đề không được bỏ trống!" }
      });
    }

    const findSpinWord = await SpinWord.findOne({ _id: req.params.id });

    // Check catch when update post categories
    if (!findSpinWord) {
      return res
        .status(404)
        .json({ status: "error", message: "Chủ đề không tồn tại!" });
    }

    return res
      .status(201)
      .json(
        jsonResponse(
          "success",
          await SpinWord.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          )
        )
      );
  },
  delete: async (req, res) => {
    // Check if don't use query
    if (req.params.id === undefined || req.params.id.length === 0) {
      return res.status(403).json({
        status: "fail",
        _id: "Vui lòng cung cấp query ID để xác thực chủ đề muốn xóa!"
      });
    }

    const spinWordInfo = await SpinWord.findOne({ _id: req.params.id });

    // Check error
    if (!spinWordInfo) {
      return res
        .status(404)
        .json({ status: "error", message: "Chủ đề không tồn tại!" });
    }

    // Remove package
    await spinWordInfo.remove();
    res.status(200).json({ status: "success", data: null });
  },
  getWordByKey: async (req, res) => {
    let wordInfo, dataResponse;

    wordInfo = await SpinWord.findOne({ _id: req.body._id })
      .populate({ path: "theme", select: "_id name description" })
      .lean();
    dataResponse = await SpinWord.find({ key: req.body.key })
      .populate({ path: "theme", select: "_id name description" })
      .lean();

    console.log(wordInfo);
    console.log(dataResponse);

    if (!wordInfo) {
      return res
        .status(404)
        .json({ status: "error", message: "Tên từ khóa không tồn tại" });
    }

    if (dataResponse) {
      return res.status(201).json(jsonResponse("success", dataResponse));
    }
  },
  /**
   * Request cần phải chứa nội dung (text) và chủ đề (theme) trong body. Khi gửi văn bản cần spin phải kèm theo 1 chủ đề.
   */
  spin: async (req, res) => {
    let sentence = req.body.text.normalize();

    let chunked = Chunking.tag(sentence);
    let wordTokens = [];

    let isWordRegex = /(?:^|\s)([\wáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữự]*)(?=\s|$)/g;
    chunked.forEach(item => {
      if (item[ 0 ]) {
        wordTokens.push(item[ 0 ]);
      }
    });
    if (!req.body.theme) {
      return res.status(400).json({
        status: "error",
        message: "Không có chủ đề spin."
      });
    }
    const customTheme = await SpinTheme.findById(req.body.theme);
    const customThemeFilter = await SpinWord.find({
      theme: customTheme._id
    }).lean();


    for (let i = 0; i < wordTokens.length; i++) {
      if (isWordRegex.test(wordTokens[ i ])) {
        let searchPhrase = wordTokens[ i ];
        let searchRes = await customThemeFilter.find(filterItem => searchPhrase.toLowerCase() === filterItem.name.normalize().toLowerCase());
        let k = 1;
        while (k <= 4) {
          if (!searchRes) {
            if (wordTokens[ i + k ]) {
              if (isWordRegex.test(wordTokens[ i + k ])) {
                searchPhrase = `${searchPhrase} ${wordTokens[ i + k ]}`;
                searchRes = await customThemeFilter.find(filterItem => searchPhrase.toLowerCase() === filterItem.name.normalize().toLowerCase());
                k++;
              } else {
                break;
              }
            } else {
              break;
            }
            
          } else {
            break;
          }
        }
        if (searchRes) {
          let synonyms = customThemeFilter.filter(
            filterItem => searchRes.key === filterItem.key
          );
          let random = Math.floor(Math.random() * synonyms.length);
          let regex = new RegExp(`(${searchRes.name.normalize()})`, "gi");
          sentence = sentence.replace(regex, synonyms[ random ].name);
        }
      }
    }

    return res.status(201).json(jsonResponse("success", sentence));
  }
};
