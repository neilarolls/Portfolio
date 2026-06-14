window.onload = (e) => {

    const titleWrapper = document.getElementById("code-transporter-header");
    const animWrapper = document.getElementById("code-transporter-content");
    const topWrapper = document.getElementById("coding-top");
    const wrapperHeight = (animWrapper.clientHeight);

    console.log(`header          ${titleWrapper}`);
    console.log(`wrapper         ${animWrapper}`);
    console.log(`wrapper height  ${wrapperHeight}`);

    let targetY = titleWrapper.offsetHeight;

    console.log(`targetY   ${targetY}`);

    // const block1 = document.getElementById("code-anim-block-1");
    // const block2 = document.getElementById("code-anim-block-2");
    // const block3 = document.getElementById("code-anim-block-3");
    // const block4 = document.getElementById("code-anim-block-4");
    // const block5 = document.getElementById("code-anim-block-5");
    // const block6 = document.getElementById("code-anim-block-6");
    // const block7 = document.getElementById("code-anim-block-7");
    // const block8 = document.getElementById("code-anim-block-8");
    // const block9 = document.getElementById("code-anim-block-9");
    // const block10 = document.getElementById("code-anim-block-10");


    $(animWrapper).css({"top":`${targetY - wrapperHeight - 500}px`});
    
    $(animWrapper).animate({"top":`${targetY + 125}`}, 1250);

};