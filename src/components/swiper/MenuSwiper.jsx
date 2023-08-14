/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { getMenuItemStyles, getMenuSwiperAnimation } from "./MenuSwiper.Styles";
import MenuSwiperUtils from "./MenuSwiper.Utils";

export default function MenuSwiper({ heading, caption, swiperType }) {
  console.log("Swiper type at swiper", swiperType);
  const { classes } = getMenuItemStyles();
  const { initial, whileInView, transition } = getMenuSwiperAnimation;
  const { isDataLoaded, lunchItems, snacksItems } = MenuSwiperUtils();

  return (
    <>
      {isDataLoaded ? (
        <motion.div
          initial={initial}
          whileInView={whileInView}
          transition={transition}
        >
          <motion.div className={classes.getSwiperTextContStyles}>
            <Typography className={classes.getSwiperTextOneStyles}>
              {heading}
            </Typography>
            <Typography className={classes.getSwiperTextTwoStyles}>
              {caption}
            </Typography>
          </motion.div>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            loop={false}
            autoplay
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={false}
            modules={[EffectCoverflow, Pagination]}
            className={classes.getMainContStyles}
          >
            {swiperType =="Lunch"
              ? lunchItems?.map((item) => {
                  return (
                    <SwiperSlide className={classes.getFoodItemImageContStyles}>
                      <img
                        src={item.itemImage}
                        alt=""
                        className={classes.getFoodItemImageStyles}
                      />
                      <Typography className={classes.getSnacksItemNameStyles}>
                        {item.itemName}
                      </Typography>
                    </SwiperSlide>
                  );
                })
              : snacksItems?.map((item) => {
                  return (
                    <SwiperSlide className={classes.getFoodItemImageContStyles}>
                      <img
                        src={item.itemImage}
                        alt=""
                        className={classes.getFoodItemImageStyles}
                      />
                      <Typography className={classes.getSnacksItemNameStyles}>
                        {item.itemName}
                      </Typography>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </motion.div>
      ) : (
        <motion.div
          initial={initial}
          whileInView={whileInView}
          transition={transition}
        >
          <motion.div className={classes.getSwiperTextContStyles}>
            <Skeleton>
              <Typography className={classes.getSwiperTextOneStyles}>
                {heading}
              </Typography>
            </Skeleton>
            <Skeleton>
              <Typography className={classes.getSwiperTextTwoStyles}>
                {caption}
              </Typography>
            </Skeleton>
          </motion.div>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            loop={false}
            autoplay
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={false}
            modules={[EffectCoverflow, Pagination]}
            className={classes.getMainContStyles}
          >
            {snacksItems?.map((item) => {
              return (
                <SwiperSlide className={classes.getFoodItemImageContStyles}>
                  <Skeleton>
                    <img
                      src={item.itemImage}
                      alt=""
                      className={classes.getFoodItemImageStyles}
                    />
                  </Skeleton>
                  <Skeleton>
                    <Typography className={classes.getSnacksItemNameStyles}>
                      {item.itemName}
                    </Typography>
                  </Skeleton>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      )}
    </>
  );
}
