document.addEventListener("DOMContentLoaded", () => {
    const deleteBtn = document.querySelector(".btns:first-child"); // to select the Delete button
    const editBtn = document.querySelector(".btns:nth-child(2)");  // to select the Edit button, which is the second one

    if(deleteBtn) {
        deleteBtn.addEventListener("click", async() => {
            const confirmed = confirm("Are you sure you want to delete this post?");

            if(!confirmed)    // If it doesn't want to delete the post, return 
                return;   
            
            const postId = deleteBtn.getAttribute("data-id");
            
            try {
                const response = await fetch(`/newPosts/${postId}`, {
                    method: "DELETE"
                });

                if(response.ok)
                {
                    alert("Post deleted Succesfully");
                    window.location.href = "/";
                }
                else {
                    alert("Failed to delete this post!");
                }
            }
            catch(error){
                console.error("Error deleting post: ", error);
            }
        });
    }
    if(editBtn){
        editBtn.addEventListener("click", async () => {
            const editPostID = editBtn.getAttribute("data-id");
            window.location.href = `/editPost/${editPostID}`;
        });
    }

});