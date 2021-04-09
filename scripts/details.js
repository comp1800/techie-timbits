function getDetails() {
    // https://some.site/?id=123
    const parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get("id")); // "123"

    var id = parsedUrl.searchParams.get("id");
    console.log(id);  
}
getDetails();