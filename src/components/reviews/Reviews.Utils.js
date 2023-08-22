/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
const ReviewsUtils = () => {
  const imageVariants = {
    bounce: {
      y: [0, -20, 20, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return {
    imageVariants,
  };
};

export default ReviewsUtils;
