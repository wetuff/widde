<?
	
	ini_set( "display_errors", 0);
	
	$email = trim($_POST["txtEmail"]);

	if( PATH_SEPARATOR == ";" ) $quebra_linha = "\r\n"; //Se for Windows
	else $quebra_linha = "\n"; //Se "não for Windows"

	$emailsender = "no-reply@widde.com.br";
	//$emailsender = "emerson@weme.com.br";

	//$destino = "emerson@weme.com.br";
    $destino = "no-reply@widde.com.br";
    $cabecalho = "MIME-Version:1.1" . $quebra_linha;
    $cabecalho .= "Content-type: text/html; charset=utf-8" . $quebra_linha;
    $cabecalho .= "From: " . $emailsender . $quebra_linha;
    $cabecalho .= "Reply-To: " . $destino . $quebra_linha;
	
	$assunto = "widde - Novo interesse";

	$email = "
		<html xmlns='http://www.w3.org/1999/xhtml'>
		<head>
			<title>Widde</title>
		</head>
		<body bgcolor=#FFFFFF marginwidth=0 marginheight=0>
			<table cellpadding='0' cellspacing='0' border='0' width='100%' align='center' style='color:#4e402c'>
				<tr>
					<td colspan='2'>
						<strong>E-mail: </strong>".$email."
					</td>
				</tr>
			</table>
		</body>
		</html>
	";	

	if(!mail($destino, $assunto, $email, $cabecalho ,"-r".$emailsender)){ // Se for Postfix
		$cabecalho .= "Return-Path: " . $emailsender . $quebra_linha; // Se "não for Postfix"
		mail($destino, $assunto, $email, $cabecalho );
	}

?>