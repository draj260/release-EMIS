var app = angular.module('LoginApp', []);

app.config(function($locationProvider)
{
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
});

app.controller('LoginController', function loginController($scope, $http, $location, $filter,$window)
{   $scope.objEntityPage = {};
	$scope.UserInputs = {};
	$scope.objDataTable = {};
	$scope.objEntityMenu = {};
    $scope.objEntityUserSessionInfo = {};
    $scope.User = "User ";
	$scope.Password = "Password";
	$scope.Branch = "Branch";
	$scope.Role = "Role";
	$scope.user='';
    $scope.password='';
	$scope.branch='';
	$scope.role='';


$scope.HandleUnexpectedError = function (response)
	{
		if (response === undefined) response = 'Unexpected Error';
		if (response.message)
		{
            ShowErrorPopup(response.message);

		} else if (response.status)
		{
            ShowErrorPopup(response.status + ' : ' + response.statusText);
		}
		else
		{
            //ShowErrorPopup(response);
		}
    }

$scope.authenticateLogIn= function ()

	{$scope.objEntityMenu = {};
	$scope.myVar=false;
	alert(1);
	$scope.displayLoader();
		$scope.objEntityUserSessionInfo.strUserCode= $scope.user;
		$scope.objEntityUserSessionInfo.strPassword= $scope.password;
		$scope.objEntityUserSessionInfo.strBranchCode=$scope.branch;
		$scope.objEntityUserSessionInfo.strUserRoleCode= $scope.role;
		$scope.objEntityMenu.objEntityUserSessionInfo=$scope.objEntityUserSessionInfo;
		var errMsg='';
		var sessionId='';
		var flag=true;
		if(null == $scope.password || "" == $scope.password || undefined == $scope.password||null == $scope.user || "" == $scope.user || undefined == $scope.user||null == $scope.branch || "" == $scope.branch || undefined == $scope.branch||null == $scope.role || "" == $scope.role || undefined == $scope.role)
		{
	     flag=false;
		 
		return;
		}
		$scope.displayLoader();
		if(flag)
		{
		$http({
			method: 'POST',
			url: './LoginController/authenticateLogIn',
			data : $scope.objEntityMenu,
		}).then(function (response)
		{
			var data = response.data;

			if (data.Error)
			{
				ShowErrorPopup(data.Error);
			    return;
			}
			if (data)
			{
				 $scope.objEntityPage = data;
				 if( $scope.objEntityPage.objTransactionMessage!=null&&'null'!= $scope.objEntityPage.objTransactionMessage)
				 {
					errMsg=  $scope.objEntityPage.objTransactionMessage.strInformationText;
					if(''!=errMsg && null !=errMsg && undefined!=errMsg)
					{
						ShowErrorPopup(errMsg);
						return;
					}
				 }

				if( $scope.objEntityPage.objEntityUserSessionInfo!=null&& 'null'!= $scope.objEntityPage.objEntityUserSessionInfo)
				{
					sessionId= $scope.objEntityPage.objEntityUserSessionInfo.strSessionId;
					if(''!=sessionId && null !=sessionId && undefined!=sessionId&&'null'!=sessionId)
					{
						var userCode =  $scope.objEntityPage.objEntityUserSessionInfo.strUserCode;
						var sessionId = $scope.objEntityPage.objEntityUserSessionInfo.strSessionId;
						var roleCode =  $scope.objEntityPage.objEntityUserSessionInfo.strUserRoleCode;
						var branchCode =  $scope.objEntityPage.objEntityUserSessionInfo.strBranchCode;
						var theUrl = "./Index.html?pUserCode=" + userCode + "&pSessionId=" + sessionId + "&pRoleCode=" + roleCode+ "&pBranchCode=" + branchCode;
						window.location.href = theUrl;
					}
				}


			}

		}).then(null, function (response)
		{
			$scope.HandleUnexpectedError(response);
		});


		}


	}

	$scope.displayLoader= function()
	{
		var overlay = document.getElementById("overlay");
		overlay.style.display = 'block';
		setTimeout(function(){ overlay.style.display = 'none';}, 5000);
	}
});



