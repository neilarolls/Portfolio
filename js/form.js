document.getElementById('cform-form').addEventListener('submit', function(e) {

    e.preventDefault();

    const allData = this.elements;
    const firstName = this.elements["first-name"].value;
    const lastName = this.elements["last-name"].value;
    const emailAddress = this.elements["email-address"].value;
    const subjectField = this.elements["subject-field"].value;
    const messageField = this.elements["message-field"].value;

    const firstName1Match = firstName.match(/^([A-Za-zÀ-ÿ'\.\-]+)/);
    let firstName1 = firstName1Match ? firstName1Match[1] : "";

    let firstName2 = "";

    if (firstName.length > 1) {
        const firstName2Match = firstName.match(/(?:^[A-Za-zÀ-ÿ'\.\-]+\s+)([A-Za-zÀ-ÿ'\.\-]+)/);
        firstName2 = firstName2Match ? firstName2Match[1] : "";
    }

    const lastName1Match = lastName.match(/^([A-Za-zÀ-ÿ'\.\-]+)/);
    let lastName1 = lastName1Match ? lastName1Match[1] : "";
    
    let lastName2 = "";

    if (lastName.length > 1) {
        const lastName2Match = lastName.match(/(?:^[A-Za-zÀ-ÿ'\.\-]+\s+)([A-Za-zÀ-ÿ'\.\-]+)/);
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