$(document).ready(function() {

  //click to authenticate person in database if not lead back to original page
//   $(document).on("click","")

  //click new user goes to the create new profile page
  $(document).on("click", ".NewUser", AppendNewUserForm);
  $(document).on("click", ".PostUser", PostUser);

  //enter login to compare with database and allow access if matches
  $(document).on("click", ".Entry", Submit);
});

  function Submit(e){
    e.preventDefault();
    var EntryUserName = $(".userlogin").val().trim();
    var EntryPassword = $(".password").val().trim();
     

     var UserLogin = {
        user_id: EntryUserName,
        user_password: EntryPassword
      }
    console.log(UserLogin);
     $.post("/login", UserLogin, function() {
       console.log(UserLogin);
      });
  }

// makes the user creation form
  function AppendNewUserForm(e){
    e.preventDefault();
    $(".container").empty();
    $(".container").append(`<div class="row">
			<div class="col-md-6 col-md-offset-3">
				
					
						<form id="New_UserForm" >
            <input class="new-item" placeholder="User name" id="user_name" type="text" />
						<input class="new-item" placeholder="Age" id="user_age" type="text" />
						<input class="new-item" placeholder="Email" id="user_email" type="text" />
						<input class="new-item" placeholder="Password" id="user_password" type="text" />
            <input class="new-item" placeholder="Password Check" id="password_check" type="text" />
						<input class="new-item" placeholder="Short bio" id="user_bio" type="text" />
                        <button type="submit" class="btn btn-default PostUser"> Create Your Profile </button>				
						</form>
										
			</div>
		</div>`);
    }

    //grabs data from the html and throw it inside mysql
    function PostUser(e){
        e.preventDefault();
            var userName = $("#user_name").val().trim();
            var userAge = $("#user_age").val().trim();
            var userEmail = $("#user_email").val().trim();
            var userPassword = $("#user_password").val().trim();
            var userBio = $("#user_bio").val().trim();
            //remember user key has to be unique
            //change age into integer if possible

            userAge = parseInt(userAge);
            // verification of correct data
            if(
            isString(userName) == true &&
            isNumber(userAge) == true &&
            isString(userEmail) == true &&
            isString(userPassword) == true &&
            isString(userBio) == true &&
            isString(userPassword) == isString($("#password_check").val().trim())
            ){
                  var todo = {
                userName: userName,
                userAge: userAge,
                userEmail: userEmail,
                userPassword: userPassword,
                userBio: userBio
                
              };
              console.log("IT WORKS");

                //get's information from the website and sends it to the api-routes-configured to execute
                $.post("/newUser", todo, function() {
                console.log(todo);
                });

            } else{
                //where to create if what they input is invalid with the database
                //if have time add a modal
                console.log("One of your entries was incorrect");
            }    


      



    }

function isString (value) {
if (value && typeof value === 'object') {
return value.constructor === String;
}
return typeof value === 'string';
};

function isNumber (value) {
return typeof value == 'number' && isFinite(value);
};