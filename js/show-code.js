window.onload = (e) => {

    const nextButton = document.getElementById("coding-next-arrow");
    const prevButton = document.getElementById("coding-prev-arrow");
    const numberOfExamples = 2;
    const currentWidth = window.innerWidth;
    let exampleIndex = 1;
    let displayColumns = (currentWidth >= 1700?2:1);

    // Updates visibility of columns.
    function updateColumns() {

        for (let i = 0; i < numberOfExamples; i++) {

            let targetColumnID = `code-top-${i+1}`;
            console.log(targetColumnID);

            if ((i + 1) === exampleIndex) {

                $(`#${targetColumnID}`).css({ display: "block" });

            } else if  (((i + 1) === (exampleIndex + 1)) && (displayColumns === 2)) {

                $(`#${targetColumnID}`).css({ display: "block" });

            } else {

                $(`#${targetColumnID}`).css({ display: "none" });

            }
        }
    }

    updateColumns();

    nextButton.addEventListener("click", function () {

        if (exampleIndex < numberOfExamples && displayColumns != 2) {

            exampleIndex++;

            updateColumns();
        }
    });

    prevButton.addEventListener("click", function () {

        if (exampleIndex > 1) {

            exampleIndex--;

            updateColumns();
        }
    });

    function updateOnResize() {

        let currentWidth = window.innerWidth;

        if (currentWidth < 1700 && displayColumns === 2) {

            displayColumns = 1;

            updateColumns();
        }

        if (currentWidth >= 1700 && displayColumns === 1) {

            displayColumns = 2;

            if (exampleIndex === numberOfExamples) {

                exampleIndex--;
            }

            updateColumns();
        }
    }

    window.addEventListener('resize', updateOnResize);

};