const isDrugExpired = (date) => {

   return new Date(date) < new Date();
};

export default isDrugExpired;