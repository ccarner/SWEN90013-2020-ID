export default [
  {
    condition: function (R) {
      console.log(this.St);
      R.when(this.St === true);
    },
    consequence: function (R) {
      console.log("here");
      this.result = "SC";
      R.stop();
    },
  },
  {
    condition: function (R) {
      R.when(
        this.St === false &&
          this.Pt === true &&
          this.Et === false &&
          this.Ht === false
      );
    },
    consequence: function (R) {
      this.result = "PO";
      R.stop();
    },
  },
  {
    condition: function (R) {
      R.when(
        this.St === false &&
          this.Pt === true &&
          (this.Et === true || this.Ht === true)
      );
    },
    consequence: function (R) {
      this.result = "PE";
      R.stop();
    },
  },
  {
    condition: function (R) {
      R.when(
        this.St === false &&
          this.Pt === false &&
          (this.Et === true || this.Ht === true)
      );
    },
    consequence: function (R) {
      this.result = "EO";
      R.stop();
    },
  },
];
