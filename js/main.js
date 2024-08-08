// Function to get all posts and populate the table
function getAllPosts() {
    $.ajax({
        url: "http://localhost:8081/blog/all",
        method: "GET",
        success: function (results) {
            console.log(results);
            alert('Posts retrieved successfully');

            let table = $('#blogs-tbl');
            table.empty();

            results.forEach((post) => {
                table.append(
                    $('<tr>').append(
                        $('<td>').text(post.id),
                        $('<td>').text(post.title),
                        $('<td>').text(post.category),
                        $('<td>').text(post.text)
                    )
                );
            });
        },
        error: function (error) {
            console.log(error);
            alert('Error while retrieving posts');
        }
    });
}

// Function to clear form fields
function clearFields() {
    $('#post-id').val('');
    $('#post-title').val('');
    $('#post-text').val('');
    $('#post-category').val('');
}

// Save post
$('#savepost').click(function () {
    let postId = $('#post-id').val();
    let postTitle = $('#post-title').val();
    let postText = $('#post-text').val();
    let postCategory = $('#post-category').val();

    let post = {
        postId: postId,
        postTitle: postTitle,
        postText: postText,
        postCategory: postCategory
    };
    console.log(post);
    $.ajax({
        url: "http://localhost:8081/blog/savePost",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            id: postId,
            title: postTitle,
            text: postText,
            category: postCategory
        }),
        success: function (results) {
            console.log(results);
            alert('Post saved successfully');
            clearFields(); // Clear form fields
            getAllPosts(); // Refresh data
        },
        error: function (error) {
            console.log(error);
            alert('Error while saving post');
        }
    });
});

// Update post
$('#updatepost').click(function () {
    let postId = $('#post-id').val();
    let postTitle = $('#post-title').val();
    let postText = $('#post-text').val();
    let postCategory = $('#post-category').val();

    let post = {
        postId: postId,
        postTitle: postTitle,
        postText: postText,
        postCategory: postCategory
    };
    console.log(post);
    $.ajax({
        url: "http://localhost:8081/blog/updatePost",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            id: postId,
            title: postTitle,
            text: postText,
            category: postCategory
        }),
        success: function (results) {
            console.log(results);
            alert('Post updated successfully');
            clearFields(); // Clear form fields
            getAllPosts(); // Refresh data
        },
        error: function (error) {
            console.log(error);
            alert('Error while updating post');
        }
    });
});

// Delete post
$('#deletepost').click(function () {
    let postId = $('#post-id').val();

    $.ajax({
        url: "http://localhost:8081/blog/deletePost/" + postId,
        method: "DELETE",
        contentType: "application/json",
        success: function (results) {
            console.log(results);
            alert('Post deleted successfully');
            clearFields(); // Clear form fields
            getAllPosts(); // Refresh data
        },
        error: function (error) {
            console.log(error);
            alert('Error while deleting post');
        }
    });
});

// Get all posts
$('#getAllpost').click(function () {
    getAllPosts();
});

// Initial load of all posts
$(document).ready(function() {
    getAllPosts();
});
