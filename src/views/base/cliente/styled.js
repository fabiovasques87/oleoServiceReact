import styled from "styled-components";



export const FormArea = styled.div`



.mb-8{
    margin-bottom:10px;
}


.AreaForm{
    width:700px;
    height:300px;
    display:flex;
    flex-direction column;
    flex-wrap: wrap;
    padding:10px;
    background-color:red;
}

.errors-alert{
    color: red;

}

button{
    width:120px;
    padding:10px;
    border-radius:8px;
    margin-top:30px;
    background-color: rgba(5, 200, 138);
    color: #FFF;
    transition: background .5s;
    border: none;

    &:hover{
        background-color: rgba(116, 158, 137);
    }


}

span{
    color:red;
    padding: 10px;
}


@media(max-width: 600px){


.toastCadSucess{
    margin-left:-1050px;
}
    
 button{
    width: 100%;
 }   

 h1 {
    font-size-14px;
 }
}

.toastCadError{
    margin-left:-1050px;
}
    
 button{
    width: 100%;
 }   

 h1 {
    font-size-14px;
 }
}




`



export const ToastMessageStyle = styled.div`



 .toastCadSucess{
     font-size:16px;
     textAlign: center;
     fontWeight:bold;
     position: fixed;
     bottom: 0;
     right: 0;
     animation: subir 6s forwards;
    color: #fff;
    background-color: #008000;

    .toastCadSucessHEader{
        background-color: #fff;
        color: #000;
    }
 }

 .toastCadError{
    font-size:16px;
    textAlign: center;
    fontWeight:bold;
    position: fixed;
    bottom: 0;
    right: 0;
    animation: subir 6s forwards;
    background-color: red;
    color: #fff;
    
    .toastCadErrorHeader{
        background-color: #fff;
        color: #000;
    }

}
 
 
 @keyframes subir {
     0% {
       transform: translateY(100%);
     }
    //  50% {
    //     transform: translateY(-400%);
    //   }
   
     100% {
       transform: translateY(-700%);
     }
   }

   `
