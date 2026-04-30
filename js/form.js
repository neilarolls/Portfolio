document.getElementById('cform-form').addEventListener('submit', function(e) {

    e.preventDefault();                                                                                 // Stop the automated submission and refresh

    const allData = this.elements;                                                                      // Get the data from the submit object input elements
    const firstName = this.elements["first-name"].value;
    const lastName = this.elements["last-name"].value;
    const emailAddress = this.elements["email-address"].value;
    const subjectField = this.elements["subject-field"].value;
    const messageField = this.elements["message-field"].value;

    const firstName1Match = firstName.match(/^([A-Za-zÀ-ÿ'\.\-]+)/);                                    // Gets the first match in the first name string
    let firstName1 = firstName1Match ? firstName1Match[1] : "";

    let firstName2 = "";

    if (firstName.length > 1) {
        const firstName2Match = firstName.match(/(?:^[A-Za-zÀ-ÿ'\.\-]+\s+)([A-Za-zÀ-ÿ'\.\-]+)/);        // Gets the second match in the first name string (after a space)
        firstName2 = firstName2Match ? firstName2Match[1] : "";
    }

    const lastName1Match = lastName.match(/^([A-Za-zÀ-ÿ'\.\-]+)/);                                      // Gets the first match in the last name string
    let lastName1 = lastName1Match ? lastName1Match[1] : "";
    
    let lastName2 = "";

    if (lastName.length > 1) {
        const lastName2Match = lastName.match(/(?:^[A-Za-zÀ-ÿ'\.\-]+\s+)([A-Za-zÀ-ÿ'\.\-]+)/);          // Gets the second match in the last name string (after a space)
        lastName2 = lastName2Match ? lastName2Match[1] : "";
    }

    console.log(firstName1);
    console.log(firstName2);
    console.log(lastName1);
    console.log(lastName2);
    console.log(emailAddress);
    console.log(subjectField);
    console.log(messageField);
})