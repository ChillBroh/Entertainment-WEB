import React from "react";

const Header = () => {
  return (
    <div>
      {" "}
      <nav
        class="relative flex w-full items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div class="flex w-full flex-wrap items-center justify-between px-3">
          <div class="flex items-center">
            <button
              class="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 dark:hover:text-white dark:focus:text-white lg:hidden"
              type="button"
              data-twe-collapse-init
              data-twe-target="#navbarSupportedContentX"
              aria-controls="navbarSupportedContentX"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div
            class="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
            id="navbarSupportedContentX"
            data-twe-collapse-item
          >
            <ul
              class="me-auto flex flex-col lg:flex-row"
              data-twe-navbar-nav-ref
            >
              <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <a
                  class="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#!"
                  data-twe-nav-link-ref
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Home
                </a>
              </li>
              <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <a
                  class="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#!"
                  data-twe-nav-link-ref
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Features
                </a>
              </li>
              <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <a
                  class="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#!"
                  data-twe-nav-link-ref
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Pricing
                </a>
              </li>
              <li class="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <a
                  class="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                  href="#!"
                  data-twe-nav-link-ref
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;