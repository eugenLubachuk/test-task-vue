export default {
  methods: {
    reset(ref = 'form') {
      this.$refs[ref].reset();
    },
    resetValidation(ref = 'form') {
      this.$refs[ref].resetValidation();
    },
  },
};
