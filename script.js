const usetTitleContainer = document.querySelector(".user-name-list");
const usetPostContainer = document.querySelector(".user-post-list");
const userPostWrapper = document.querySelector(".user-post-wrap");
const userTitleWrapper = document.querySelector(".user-name-wrap");
const backButton = document.querySelector("#back-btn");

function init() {
    userPostWrapper.classList.add("hidden");
}

init();
const getUserData = async function () {
    try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const user = await data.json();
        // console.log(user);

        const userInfo = await fetch(
            `https://jsonplaceholder.typicode.com/posts`
        );
        const userInfoData = await userInfo.json();

        for (let i = 0; i < user.length; i++) {
            let userTitleDiv = document.createElement("h2");
            userTitleDiv.classList.add(user[i].id);
            let userPostTitleArr = [];
            for (let j = 0; j < userInfoData.length; j++) {
                if (user[i].id === userInfoData[j].userId) {
                    let userPostDiv = document.createElement("p");
                    userPostDiv.classList.add(userInfoData[j].userId);
                    userPostDiv.innerHTML = userInfoData[j].title;
                    usetPostContainer.append(userPostDiv);
                    userPostTitleArr.push(userInfoData[j].title);
                }
            }
            userTitleDiv.innerHTML = user[i].username;
            usetTitleContainer.append(userTitleDiv);

            // console.log(userPostTitleArr);
            // console.log(`${user[i].username}:
            //         ${userPostTitleArr}
            // `);
        }
        let userTitle = document.querySelectorAll(".user-name-list h2");
        let userPost = document.querySelectorAll(".user-post-list p");

        userTitle.forEach((currentUser) => {
            currentUser.addEventListener("click", function () {
                console.log(currentUser.className);
                userTitleWrapper.classList.add("hidden");
                userPostWrapper.classList.remove("hidden");

                userPost.forEach((currentUserPost) => {
                    // console.log(currentUserPost.className);
                    if (currentUser.className === currentUserPost.className) {
                        currentUserPost.classList.add("show");
                    }
                });
            });
        });
    } catch (error) {
        console.error(error);
    }
};

getUserData();

backButton.addEventListener("click", () => {
    location.reload();
});
