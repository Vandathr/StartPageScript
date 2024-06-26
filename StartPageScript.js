let sessionIndex = 0;
let sessionID = 0;

let DataKeeper = document.getElementById("mainDataKeeper");

let loginInfoKeeper = document.getElementById("startPageLoginInfo");

function ColorElement(elementToColor, color){
	elementToColor.setAttribute("style", "background-color:" + color)
};


async function SendPost(url, jsonToSend) 
{
	let response = await fetch(url, {
		method: "POST",
		headers: {"Content-Type": "application/json;charset=utf-8"},
		body: jsonToSend
	
	});
	
	let result =  await response.text();
	
	return result;
};


async function SendJsonForNewzPage(){
	
	let url = "http://localhost:8888/NewsPage"; 
	
	let jsonToSend = JSON.stringify({
		command:"2",
		ListsParameterz:{
			limit:10,
			offset:0			
		}
		});
	
	DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};


async function SendJsonForReceiptzLogPage()
{
	let url = "http://localhost:8888/ReceiptzLogPage"; 
	
	let jsonToSend = JSON.stringify({
		sessionIndex:sessionIndex,
        sessionID:sessionID,
		command:"3",
		ListsParameterz:{
			limit:10,
			offset:0			
		}
		});
	
	DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};

async function SendJsonForRandomReceiptzPage()
{
	let url = "http://localhost:8888/RandomReceiptzPage"; 
	
	let jsonToSend = JSON.stringify({
		command:"7"
		});
	
	DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};

async function SendJsonForComplainsAndSuggestionsPage()
{
	let url = "http://localhost:8888/ComplainsAndSuggestionsPage"; 
	
	let jsonToSend = JSON.stringify({
		command:"4",
		ListsParameterz:{
			limit:10,
			offset:0			
		}
		});
		
		DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};


async function SendJsonForUsersReceiptzPage()
{
	let url = "http://localhost:8888/ReceiptzPage"; 
	
	let jsonToSend = JSON.stringify({
		sessionIndex:sessionIndex,
        sessionID:sessionID,
		command:"5",
		ListsParameterz:{
			limit:10,
			offset:0			
		}
		});
		
		DataKeeper.innerHTML = await SendPost(url, jsonToSend);				
};


async function SendJsonForCreateReceiptPage(){
	
	let url = "http://localhost:8888/CreateReceiptPage";
	
	let jsonToSend = JSON.stringify({
		sessionIndex:sessionIndex,
        sessionID:sessionID,
		command:"14"
		});

		DataKeeper.innerHTML = await SendPost(url, jsonToSend);	
}


async function SendJsonForUserCabinetPage()
{
	let url = "http://localhost:8888/UserCabinetPage";
	
	let jsonToSend = JSON.stringify({
		sessionIndex:sessionIndex,
        sessionID:sessionID,
		command:"6"
		});
		
		DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};

async function SendJsonForLoginPage()
{
	let url = "http://localhost:8888/UserLoginPage"; 
	
	let jsonToSend = JSON.stringify({
		sessionIndex:sessionIndex,
        sessionID:sessionID,
		command:"9"
		});
		
		DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};

async function SendJsonForRegisterPage()
{
	let url = "http://localhost:8888/RegisterPage"; 
	
	let jsonToSend = JSON.stringify({
		command:"10"
		});
		
		DataKeeper.innerHTML = await SendPost(url, jsonToSend);
	
};

async function SendJsonForRepairPasswordPage()
{
	let url = "http://localhost:8888/RepairPasswordPage";
	
	let jsonToSend = JSON.stringify({
		command:"12"
		});
		
		DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};


async function SendJsonForLogin()
{
	let url = "http://localhost:8888/LoginAction"; 
	
	let usersLogin = document.getElementById("loginKeeper").value;
	let usersPassword = document.getElementById("passwordKeeper").value;
	
	let jsonToSend = JSON.stringify({
		Container:{
			login:document.getElementById("loginKeeper").value,
			password:document.getElementById("passwordKeeper").value
		},
		command:"11"
		});
		
		let responseFromServer = await SendPost(url, jsonToSend);
		
		try{
		connectionObject = JSON.parse(responseFromServer);
		
		sessionIndex = connectionObject.Connection.index;
		sessionID = connectionObject.Connection.id;
		
		DataKeeper.innerHTML = "<h1><font color=\"red\">" + connectionObject.message + "</font></h1>";
		
		loginInfoKeeper.innerText = connectionObject.Connection.userName;
		
		}catch{
			DataKeeper.innerHTML = responseFromServer;
		}
				
};


async function SendJsonForRegister()
{
	let url = "http://localhost:8888/RegisterAction"; 
	
	let loginText = document.getElementById("loginKeeper").value;
	let passwordText = document.getElementById("passwordKeeper").value;
	let passwordRepeat = document.getElementById("passwordRepeatKeeper").value;
	
	
	if(loginText.length < 8){
		ShowRegisterPagesMessage("Логин должен быть не короче 8 символов");
		return;
		
	}
	
	if(passwordText.length < 8){
		ShowRegisterPagesMessage("Пароль должен быть не короче 8 символов");
		return;		
	}
	
	if(passwordText.localeCompare(passwordRepeat) != 0) {
		ShowRegisterPagesMessage("Пароль не совпадает");
		return;
	}

	
	let jsonToSend = JSON.stringify({
		Container:{
			login:document.getElementById("loginKeeper").value,
			password:passwordText,
			email:document.getElementById("emailKeeper").value
		},
		command:"12"
		});
		
		DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};


function ShowRegisterPagesMessage(messageText){
	let message = document.createElement('h1');
		
		message.innerHTML = messageText;
		
		let test = document.getElementById("registerPage-MainFrame");
		
		document.getElementById("registerPage-MainFrame").append(message);
}



async function SendJsonForRepairPassword()
{
	let url = "http://localhost:8888/RepairPasswordAction"; 
	
	let jsonToSend = JSON.stringify({
		Container:{
			email:document.getElementById("emailKeeper").value
		},
		command:"12"
		});
		
		DataKeeper.innerHTML = await SendPost(url, jsonToSend);
};



function AddIngredientToReceipt(){
	
	let ingredientzFrame = document.getElementById("ingredientzFrame");
	
	let createdRow = document.createElement("div");
	createdRow.className = "common-standardField createReceiptPage-Row createReceiptPage-ingredientItem";
	
	let firstCreatedCell = document.createElement("div");
	firstCreatedCell.className = "common-standardField createReceiptPage-Cell";
	
	firstCreatedCell.append(CreateInput())
	
	createdRow.append(firstCreatedCell);
	
	let secondCreatedCell = document.createElement("div");
	secondCreatedCell.className = "common-standardField createReceiptPage-AdditionalCell";
	
	secondCreatedCell.append(CreateInput());
	
	createdRow.append(secondCreatedCell);
	
	let thirdCreatedCell = document.createElement("div");
	thirdCreatedCell.className = "common-standardField createReceiptPage-AdditionalCell";
	
	thirdCreatedCell.append(CreateInput());
	
	createdRow.append(thirdCreatedCell);
	
	ingredientzFrame.prepend(createdRow);
	
}

function AddStepToReceipt(){
	
	let stepzFrame = document.getElementById("stepzFrame");
	
	let createdRow = document.createElement("div");
	createdRow.className = "common-standardField createReceiptPage-Row createReceiptPage-stepItem";
		
	createdRow.append(CreateTextArea());
	
	stepzFrame.prepend(createdRow);
	
};


function DownloadAsPDF(){
	alert("Ещё не сделано");
}

async function WriteReceipt(){
	
	let url = "http://localhost:8888/WriteReceipt";
	
	let receiptName = document.getElementById("newReceiptName").firstChild.value;
	let receiptDescription = document.getElementById("newReceiptDescription").firstChild.value;
	
	let ingredientNameN = [];
	let ingredientAmountN = [];
	let ingredientMeasureN = [];
	let ingredientIsChangedN =[];
	
	let receiptIngredientItemN = document.getElementsByClassName("createReceiptPage-ingredientItem");
	
	for(let i = 0; i < receiptIngredientItemN.length; i++){
		
		ingredientNameN.push(receiptIngredientItemN[i].childNodes[0].firstChild.value);
		ingredientAmountN.push(receiptIngredientItemN[i].childNodes[1].firstChild.value);
		ingredientMeasureN.push(receiptIngredientItemN[i].childNodes[2].firstChild.value);
		ingredientIsChangedN.push(true);		
	}
	
	let stepNameN = [];
	let stepIsChangedN =[];
	
	let receiptStepItemN = document.getElementsByClassName("createReceiptPage-stepItem");

	for(let i = 0; i < receiptStepItemN.length; i++){
		
		stepNameN.push(receiptIngredientItemN[i].childNodes[0].firstChild.value);
		stepIsChangedN.push(true);		
	}
	
		
	let receiptToSend = {
	sessionIndex:sessionIndex,
	sessionID:sessionID,
	command:"15",		
	ReceiptOfUser:{
		HeaderOfReceipt:{
			ID:"",
			name:receiptName,
			description:receiptDescription,
			author:"",
			hasChangez:true			
		},
		ContainerOfIngredientz:{
			hasChangez:true,
			nameN:ingredientNameN,
			amountN:ingredientAmountN,
			measureN:ingredientMeasureN,
			isChangedN:ingredientIsChangedN			
		},
		ContainerOfReceiptzStepz:{
			hasChangez:true,
			receiptStepN:stepNameN,
			isChangedN:stepIsChangedN
			
		}
	}
	}
	
	let jsonToSend = JSON.stringify(receiptToSend);
		
	DataKeeper.innerHTML = await SendPost(url, jsonToSend);
	
}


async function ReadReceipt(sourceNodeN){
	
	let url = "http://localhost:8888/ReadReceipt"; 
	
	let jsonToSend = JSON.stringify({
		command:"7",
		ReceiptzParameterz:{
			authorId:sourceNodeN[1].value,
			receiptId:sourceNodeN[3].value
		}
		});
	
	DataKeeper.innerHTML = await SendPost(url, jsonToSend);
	
}




function CreateInput(){
	let input = document.createElement("input");
	input.type = "text";
	input.size = "40";
	
	return input;
}


function CreateTextArea(){
	let input = document.createElement("textarea");
	input.class = "common-standardField createReceiptPage-stepsTextArea";
	
	return input;
}