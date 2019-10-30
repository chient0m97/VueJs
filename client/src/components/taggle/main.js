/* eslint-disable */
const validators = {
  email: new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  url: new RegExp(
    /^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i
  ),
  text: new RegExp(/^[a-zA-Z]+$/),
  digits: new RegExp(/^[\d() \.\:\-\+#]+$/),
  isodate: new RegExp(
    /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
  )
};
/* eslint-enable */
export default {
  name: "InputTag",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ""
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    validate: {
      type: [String, Function, Object],
      default: ""
    },
    addTagOnKeys: {
      type: Array,
      default: function() {
        return [
          13, // Return
          188, // Comma ','
          9 // Tab
        ];
      }
    },
    addTagOnBlur: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: -1
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    beforeAdding: {
      type: Function
    }
  },
  data() {
    return {
      newTag: "",
      innerTags: [...this.value],
      isInputActive: false
    };
  },
  computed: {
    isLimit: function() {
      return this.limit > 0 && Number(this.limit) === this.innerTags.length;
    }
  },
  watch: {
    value() {
      this.innerTags = [...this.value];
    }
  },
  methods: {
    focusNewTag() {
      if (this.readOnly || !this.$el.querySelector(".new-tag")) {
        return;
      }
      this.$el.querySelector(".new-tag").focus();
    },
    handleInputFocus() {
      this.isInputActive = true;
    },
    handleInputBlur(e) {
      this.isInputActive = false;
      this.addNew(e);
    },
    async addNew(e) {
      const keyShouldAddTag = e
          ? this.addTagOnKeys.indexOf(e.keyCode) !== -1
          : true,
        typeIsNotBlur = e && e.type !== "blur",
        tag = this.beforeAdding
          ? await this.beforeAdding(this.newTag)
          : this.newTag,
        isValid = await this.validateIfNeeded(tag);

      if (
        (!keyShouldAddTag && (typeIsNotBlur || !this.addTagOnBlur)) ||
        this.isLimit
      ) {
        return;
      }

      if (
        tag &&
        isValid &&
        (this.allowDuplicates || this.innerTags.indexOf(tag) === -1)
      ) {
        this.innerTags.push(tag);
        this.newTag = "";
        this.tagChange();
        e && e.preventDefault();
      }
    },
    validateIfNeeded(tagValue) {
      if (this.validate === "" || this.validate === undefined) {
        return true;
      }
      if (typeof this.validate === "function") {
        return this.validate(tagValue);
      }
      if (
        typeof this.validate === "string" &&
        Object.keys(validators).indexOf(this.validate) > -1
      ) {
        return validators[this.validate].test(tagValue);
      }
      if (
        typeof this.validate === "object" &&
        this.validate.test !== undefined
      ) {
        return this.validate.test(tagValue);
      }
      return true;
    },
    remove(index) {
      this.innerTags.splice(index, 1);
      this.tagChange();
    },
    removeLastTag() {
      if (this.newTag) {
        return;
      }
      this.innerTags.pop();
      this.tagChange();
    },
    tagChange() {
      this.$emit("update:tags", this.innerTags);
      this.$emit("input", this.innerTags);
    }
  }
};
