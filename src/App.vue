<template>
	<router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

/* Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property */
*:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
	all: unset;
	display: revert;
}

/* Preferred box-sizing value */
*,
*::before,
*::after {
	box-sizing: border-box;
}

/*
  Remove list styles (bullets/numbers)
  in case you use it with normalize.css
*/
ol,
ul {
	list-style: none;
}

/* For images to not be able to exceed their container */
img {
	max-width: 100%;
}

/* Removes spacing between cells in tables */
table {
	border-collapse: collapse;
}

/* Revert the 'white-space' property for textarea elements on Safari */
textarea {
	white-space: revert;
}
/* End of CSS reset */

body {
	font-family: "Work Sans", sans-serif;
	scroll-behavior: smooth;
	background: white;
}

/* .dark {
	--bg: #0f0e17;
	--headline: #fffffe;
	--paragraph: #a7a9be;
	--btn_bg: #ff8906;
	--btn_txt: #fffffe;
	--shadow: 0 0px 6px 6px #00000033;
	--tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	--tw-ring-inset: var(--tw-empty, ! !);
	--tw-ring-offset-width: 0px;
	--tw-ring-offset-color: #fff;
	--tw-ring-color: rgba(59, 130, 246, 0.5);
	--tw-ring-offset-shadow: 0 0 #0000;
	--tw-ring-shadow: 0 0 #0000;
	background: var(--bg);
	color: var(--paragraph);
} */

*{
	--bg: rgba(243, 244, 246, 1);
	--color: rgba(6, 78, 59, 1);
	--btn_bg: rgba(52, 211, 153, 1);
	--shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	--inset-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
	--ring-inset: var(--empty, /*!*/ /*!*/);
	--ring-offset-width: 0px;
	--ring-offset-color: #fff;
	--ring-color: rgba(59, 130, 246, 0.5);
	--ring-offset-shadow: 0 0 #0000;
	--ring-shadow: 0 0 #0000;
	color: var(--color);
}

::-webkit-scrollbar {
	opacity: 0;
	width: 0.3em;
	height: 0;
}

::-webkit-scrollbar-thumb {
	border-radius: 100vw;
	background-color: var(--color);
}

ion-icon {
	fill: var(--color);
}
</style>
