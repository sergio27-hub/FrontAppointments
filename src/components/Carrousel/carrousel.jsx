import React, { useEffect } from 'react';
import { Carousel, initTWE } from 'tw-elements';
import image2 from '../../assets/images/2.jpg';
import principal from '../../assets/smartSolutionsIA/principal.webp';

const CarouselComponent = () => {
  useEffect(() => {
    initTWE({ Carousel });
    const firstSlide = document.querySelector('[data-twe-carousel-item]:first-child');

    if (firstSlide) {
      firstSlide.classList.add('opacity-100');

      setTimeout(() => {
        firstSlide.classList.remove('opacity-100');
      }, 10000);
    }
  }, []);

  return (
    <div
      id="carouselDarkVariant"
      data-twe-carousel-init
      className="bg-black dark:bg-black dark:bg-opacity-50 overflow-hidden object-fill h-[800px] md:h-[700px] lg:h-[900px] relative w-full flex flex-col items-center justify-center"
      data-twe-ride="carousel"
    >
      <div
        className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] flex list-none justify-center p-0"
        data-twe-carousel-indicators
      >
        <button
          data-twe-target="#carouselDarkVariant"
          data-twe-slide-to="0"
          data-twe-carousel-active
          className="mx-[3px] box-content h-[9px] w-[38px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-red-400 bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          data-twe-target="#carouselDarkVariant"
          className="mx-[3px] box-content h-[9px] w-[38px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-red-400 bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          data-twe-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          data-twe-target="#carouselDarkVariant"
          className="mx-[3px] box-content h-[9px] w-[38px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-red-400 bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          data-twe-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="absolute w-full overflow-hidden bottom-8 after:clear-both after:block after:content-['']">
        <div
          className="relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-fade
          data-twe-carousel-item
          data-twe-carousel-active
        >
          <img
            src={principal}
            className="block w-full h-[800px] md:h-[700px] lg:h-[900px] md:object-fill lg:object-fill object-scale-down"
            alt="Motorbike Smoke"
          />
          <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
            {/* Add any content here */}
          </div>
        </div>
        <div
          className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-fade
          data-twe-carousel-item
        >
          <img
            src={image2}
            className="block w-full h-[800px] md:h-[700px] lg:h-[900px] md:object-fill lg:object-fill object-scale-down"
            alt="Mountaintop"
          />
          <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
            <h5 className="text-xl md:text-3xl lg:text-5xl text-white">Quality and experience</h5>
            <p className="text-sm md:text-xl lg:text-3xl text-white font-mono">
              Reflects our dedication to providing superior service and expertise. We ensure top-notch results and customer satisfaction in every project.
            </p>
          </div>
        </div>
        <div
          className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-fade
          data-twe-carousel-item
        >
          <img
            src="https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2018/09/estilos-tuning-desaparecer_4.jpg?tf=3840x"
            className="block w-full h-[800px] md:h-[700px] lg:h-[900px] md:object-fill lg:object-fill object-scale-down"
            alt="Woman Reading a Book"
          />
          <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
            <h5 className="text-xl md:text-3xl lg:text-5xl text-white font-bold">PROJECT COMPLETED!</h5>
            <p className="text-sm md:text-xl lg:text-3xl text-white">Potential Project</p>
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-0 left-0 top-56 z-[1] flex w-[8%] h-3/6 items-center justify-center border-0 bg-transparent p-0 text-center text-white opacity-75 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:bg-[rgba(131,131,131,0.5)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none focus:bg-[rgba(37,37,37,0.5)] focus:text-white focus:border-[rgba(214,188,250,0.5)] focus:no-underline focus:opacity-100 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-twe-target="#carouselDarkVariant"
        data-twe-slide="prev"
      >
        <span className="inline-block h-8 w-8 dark:grayscale">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-12 w-12"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
      </button>
      <button
        className="absolute bottom-0 right-0 top-56 z-[1] flex w-[8%] h-3/6 items-center justify-center border-0 bg-transparent p-0 text-center text-white opacity-75 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:bg-[rgba(131,131,131,0.5)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none focus:bg-[rgba(37,37,37,0.5)] focus:text-white focus:border-[rgba(214,188,250,0.5)] focus:no-underline focus:opacity-100 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-twe-target="#carouselDarkVariant"
        data-twe-slide="next"
      >
        <span className="inline-block h-8 w-8 dark:grayscale">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-12 w-12"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
