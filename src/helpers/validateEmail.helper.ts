export const validateEmail = (link: string, email: string): string => {
    return `<head>
    <title>Activa tu cuenta</title>
    <style type="text/css">
    /*Force Hotmail to display normal line spacing */
  body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
  table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
  img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
  
      /* /\/\/\/\/\/\/\/\/ RESET STYLES /\/\/\/\/\/\/\/\/ */
  body{margin:0; padding:0;}
  img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
  table{border-collapse:collapse !important;}
  body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}
  
      /* /\/\/\/\/\/\/\/\/ TEMPLATE STYLES /\/\/\/\/\/\/\/\/ */
  
      /* ========== Page Styles ========== */
  
  #bodyCell{padding:0px;}
  #templateContainer{max-width:600px;}
  
  body, #bodyTable{
      background-color:#edeff0;
      margin-bottom: 26px;
  }
  
  #bodyCell{
      border-top:none;
  }
  
  #templateContainer{
      border:none;
  }
  
  h1{
    color:#183643;
    display:block;
    font-family:Helvetica, sans-serif;
      font-size:32px;
      font-style:normal;
      font-weight:bold;
      line-height:38px;
      letter-spacing:normal;
      margin-top:40px;
      margin-right:0;
      margin-bottom:50px;
      margin-left:0;
  }
  
      /* ========== Header Styles ========== */
  
  #templateHeader{
      background-color:#edeff0;
      text-align: center;
      margin-top:26px;
      margin-bottom: 26px;
  }
  
  .headerContent{
    color:#445258;
    font-family:Helvetica, sans-serif;
      font-size:20px;
      font-weight:bold;
      line-height:100%;
      padding-top:0;
      padding-right:0;
      padding-bottom:0;
      padding-left:0;
      text-align:center;
      vertical-align:middle;
      background-color: #ffffff;
  }
  
  #headerImage{
      height:auto;
      max-width:600px;
  }
  
      /* ========== Body Styles ========== */
  
  #templateBody, #headline {
      background-color:#FFFFFF;
      text-align: center;
  }
  
  .bodyContent{
    color:#445258;
    font-family:Helvetica, sans-serif;
      font-size:15px;
      line-height:150%;
      background-color:#FFFFFF;
  }
  
  .bodyContent a:link, .bodyContent a:visited, /* Yahoo! Mail Override */ .bodyContent a .yshortcuts /* Yahoo! Mail Override */{
    color:#0098db;
    font-weight:normal;
      text-decoration:none;
  }
    #linkSection
    {
      white-space: pre-wrap; /* css-3 */
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: -o-pre-wrap; /* Opera 7 */
      word-wrap: break-word; /* Internet Explorer 5.5+ */
    }
  
      /* /\/\/\/\/\/\/\/\/ MOBILE STYLES /\/\/\/\/\/\/\/\/ */
  
  @media only screen and (max-width: 480px){
    /* /\/\/\/\/\/\/ CLIENT-SPECIFIC MOBILE STYLES /\/\/\/\/\/\/ */
    body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} /* Prevent Webkit platforms from changing default text sizes */
      body{width:100% !important; min-width:100% !important;} /* Prevent iOS Mail from adding padding to the body */
  
      /* /\/\/\/\/\/\/ MOBILE RESET STYLES /\/\/\/\/\/\/ */
      #bodyCell{padding:10px !important;}
  
      /* /\/\/\/\/\/\/ MOBILE TEMPLATE STYLES /\/\/\/\/\/\/ */
  
      /* ======== Page Styles ======== */
  
  
      #templateContainer{
          max-width:600px !important;
          width:100% !important;
      }
  
  
      h1{
    font-size:26px !important;
          line-height:125% !important;
      }
  
      /* ======== Body Styles ======== */
  
      .bodyContent{
    font-size:16px !important;
          line-height:140% !important;
      }
  }
  </style>
  </head>
  <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="background-color:#edeff0; margin-bottom: 26px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color:#edeff0; margin-bottom: 26px;">
          <tbody><tr>
              <td align="center" valign="top" id="bodyCell">
                  <!-- BEGIN TEMPLATE // -->
                  <table border="0" cellpadding="0" cellspacing="0" id="templateContainer" style="max-width:600px;">
                                        <tbody><tr>
                          <td align="center" valign="top">
                              <!-- BEGIN PREHEADER LOGO // -->
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader" style="margin-top: 36px; margin-bottom: 26px;">
                                  <tbody><tr>
                                      <td align="center">
                                          <a href="http://localhost:5173/" target="_blank"><img src="https://imgur.com/XGD8xis.png" style="max-width:180px;" alt="Satovar"></a>
                                      </td>
                                  </tr>
                              </tbody></table>
                              <!-- // END PREHEADER LOGO -->
                          </td>
                      </tr>
                                        <tr>
                          <td align="center" valign="top">
                              <!-- BEGIN HEADER // -->
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody><tr>
                                      <td valign="top">
                                          <img src="https://www.shapeways.com/rrstatic/img/email/email-rounded-top.jpg" width="100%" style="vertical-align:bottom;">
                                      </td>
                                  </tr>
                              </tbody></table>
                              <!-- // END HEADER -->
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff;">
                                  <tbody><tr>
                                      <td>
                                          <!-- Body of email will go here -->
                                          
  
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;font-family:Helvetica, Arial, sans-serif;color:#445258;line-height: 22px;">
    <tbody><tr>
      <td style="text-align: center; display: block; padding: 0px 20px 20px 20px;">
        <h1 style="color:#183643;text-align: center; font-size: 24px; letter-spacing: 1px; margin-bottom: 30px;">Activa tu cuenta de Satovar,${email}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0px 16.66% 40px 16.66%; text-align: center; display: block;">
        <img style="width: 100%" src="https://imgur.com/fzGKS9E.png" alt="Activate Your Shapeways Account">
      </td>
    </tr>
    <tr>
      <td style="text-align: center; font-family:Helvetica, Arial, sans-serif;">
        <a href="${link}" title="Verificar correo electronico" style="background: #000000; border: solid 1px #000000; border-radius: 2px; padding: 3% 7%; color: #ffffff; font-weight: bold; font-size: 14px; letter-spacing: .25px; -webkit-font-smoothing: antialiased; text-transform: uppercase; text-decoration: none; line-height:18px; display: inline-block;" target="_blank">Verificar correo electrónico</a>
      </td>
    </tr>
    <tr>
    </tr>
  </tbody></table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td valign="top">
                                          <img src="https://www.shapeways.com/rrstatic/img/email/email-rounded-bottom.jpg" width="100%" style="vertical-align:top;">
                                      </td>
                                  </tr>
                              </tbody></table>
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="">
  </table>
                                                      </td>
                      </tr>
                  </tbody></table>
                  <div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><table style="table-layout:auto;margin-bottom:0px;font-family:arial;border-collapse:initial;width:max-content;min-width:auto;height:170px;padding:10px 16px;border:1px solid rgb(239,243,245);border-radius:4px"><tbody><tr style="border:none"><td style="padding:0px;background:none;margin-right:8px"><img alt="Satovar  profile picture" width="100" height="100" src="https://lh3.googleusercontent.com/a/ACg8ocLuPpjimgOCxRvL2vtskEUQySrp_AouOPHAsIB6KW6G=s96-c" style="color:transparent;display:block;width:100px;height:100px;border-radius:50%;float:right"></td><td style="background:none;padding:0px 14px 0px 8px;min-width:175px"><b style="margin-bottom:4px;font-size:20px;color:rgb(42,59,71);line-height:24px;height:24px">Satovar </b><p style="font-size:14px;margin:0px 0px 8px"><span style="color:rgb(105,116,119);margin:0px"><a href="mailto:noreply.satovar@gmail.com" target="_blank">noreply.satovar@gmail.com</a></span></p><div></div></td><td style="padding:0px;min-width:auto"><div style="width:4px;height:85px;border-radius:50px;background-color:rgb(235,86,86);border:2px solid rgb(235,86,86)"></div></td><td style="background:none;padding:10px 0px 7px 14px"><span style="margin-bottom:4px;font-size:14px;color:rgb(105,116,119);line-height:24px;height:24px;display:block"><img src="https://edteam-media.s3.amazonaws.com/app/modules/signature/theme/pin-red.png" alt="phone-blue" width="20" height="20" style="margin-top:3px;float:left;margin-right:7px;border-radius:50%;display:block">Costa Rica</span></td></tr></tbody></table></div></div>
              </td>
              
          </tr>
          
      </tbody></table>
  
  </body>`;
};
export const EmailValidationSuccess = (): string => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Correo electrónico verificado</title>
<style>
html,
body {
	font-size: 24px;
	margin: 0;
	padding: 0;
}

.main-container {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
}

.check-container {
	width: 6.25rem;
	height: 7.5rem;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: space-between;
}

.check-background {
	width: 100%;
	height: calc(100% - 1.25rem);
	background: linear-gradient(to bottom right, #5de593, #41d67c);
	box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
		0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
	transform: scale(0.84);
	border-radius: 50%;
	animation: animateContainer 0.75s ease-out forwards 0.75s;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
}

.check-background svg {
	width: 65%;
	transform: translateY(0.25rem);
	stroke-dasharray: 80;
	stroke-dashoffset: 80;
	animation: animateCheck 0.35s forwards 1.25s ease-out;
}

.check-shadow {
	bottom: calc(-15% - 5px);
	left: 0;
	border-radius: 50%;
	background: radial-gradient(closest-side, rgba(73, 218, 131, 1), transparent);
	animation: animateShadow 0.75s ease-out forwards 0.75s;
}

@keyframes animateContainer {
	0% {
		opacity: 0;
		transform: scale(0);
		box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
	}
	25% {
		opacity: 1;
		transform: scale(0.9);
		box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
	}
	43.75% {
		transform: scale(1.15);
		box-shadow: 0px 0px 0px 43.334px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
	}
	62.5% {
		transform: scale(1);
		box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 21.667px rgba(255, 255, 255, 0.25) inset;
	}
	81.25% {
		box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
	}
	100% {
		opacity: 1;
		box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
	}
}

@keyframes animateCheck {
	from {
		stroke-dashoffset: 80;
	}
	to {
		stroke-dashoffset: 0;
	}
}

@keyframes animateShadow {
	0% {
		opacity: 0;
		width: 100%;
		height: 15%;
	}
	25% {
		opacity: 0.25;
	}
	43.75% {
		width: 40%;
		height: 7%;
		opacity: 0.35;
	}
	100% {
		width: 85%;
		height: 15%;
		opacity: 0.25;
	}
}
</style>
</head>
<body>

<div class="main-container">
	<p>El correo electrónico ha sido verificado y su cuenta se encuentra activa.</p>
	<div class="check-container">
		<div class="check-background">
			<svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
		<div class="check-shadow"></div>
	</div>
</div>

</body>
</html>

    `;
};
