
function addDeleteButtonForMyJobs() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("jobPostings")
            .where("jobPost.User", "==", user.uid)
            .get()
            .then(function (snap) {    //list of all my jobs
                snap.forEach(function (post) {
                    //create a delete button for each of My jobs

                    // let deleteDiv = ...
                    // let deleteButton =...
                    // deleteButton.setAttribute("id", post.id);
                    // let deleteTxt...
                    // let deleteSec... 
                    // deleteButton.appendChild...
                    // deleteDiv.appendChild... 
                    // deleteSection.appendChild...

                    //add listener to each button to each of my job
                    deleteButton.addEventListener("click", function () {
                        alert("delete button clicked");
                        removeMyPost(post.id); //remove single post
                    })
                })
            })
    })
}

function removeMyPost(postid) {
    db.collection("jobPostings")
        .doc(postid)
        .delete()
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}

