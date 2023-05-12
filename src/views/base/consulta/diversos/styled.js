
import styled from "styled-components";

export const  PageArea  = styled.div`

    .formatTable{
       text-align: center;
       }

    .searchArea{
        width: 100%;
        display: flex;
        
            // form{
            //     display: flex;
            //     justify-content: center;
            //     align-items: center;
            // }


            .inputSearch--1, .inputSearch--2,.inputSearch--3{
                width: 530px;
                margin-bottom: 20px;
                padding: 10px;
                outline: 0;

                
              }
              
              .inputSearch--1{
                  margin-left: 5px;
              }
              .inputSearch--2{
                margin-left: 35px;
              }
              .inputSearch--3{
                margin-left: 35px;
              }



              .icon{
                position: absolute;
                margin-left: -35px;
                margin-top:12px;
                }

           
              
                  
                 
    }



      


    .titleRelat{
                    
        font-size:40px;
        font-weight: bold;
        font-family: arial;
        margin-top:10px;
        margin-bottom:20px;
        display: flex;
        justify-content: center;
        align-items: center;
    
    } 

    //estilo botões do relatorio veiculo por cliente

    .bootEditar{
        width: 105px;
    }

    @media(max-width: 600px){

        .searchArea{
            flex-direction: column;
            


                .inputSearch--1, .inputSearch--2 {
                    width:98%;
                    margin-left:0;
                }

                .titleRelat{
                    font-size: 10px;
                }
                .button{
                    width: 100%;
                    margin-top:20px;
                }
        }


    }

    @media(max-width: 700px){

        .searchArea{
            flex-direction: column;
            


                .inputSearch--1, .inputSearch--2, .inputSearch--3 {
                    width:98%;
                    margin-left:0;
                }
                .titleRelat{
                    font-size: 20px;
                }
                .button{
                    margin-top:20px;
                    width: 100%;
                }
        }


    }

    @media(max-width: 800px){

        .searchArea{
            flex-direction: row;
            


                .inputSearch--1, .inputSearch--2, .inputSearch--3 {
                    width:98%;
                    margin-left:0;
                }
             
        }

        .titleRelat{
            margin-top:5px;
            font-size: 20px;
        }

        .button{
            margin-top:20px;
            width: 100%;
        }

    }
   
    @media print {
        form {
            display: none;
        }
        .button{
            display: none;
        }
       
          .nav-item{
            display:none;
          }
       .titleRelat{
        font-size:30px;
        margin-top:50px;
        margin-bottom:50px;
       }
       
       table, tbody{
        margin-top:40px;
       }
         
    }
    @page {
        margin: 0;
        size: auto;
      }

`