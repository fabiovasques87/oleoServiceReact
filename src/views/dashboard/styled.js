
import styled from "styled-components";

export const  PageArea  = styled.div`

    .searchArea{
        width: 100%;
        display: flex;
        
        .searchArea-1{


            .inputSearch{
                width: 350px;
                margin-bottom: 20px;
                margin-left: 35px;
                margin-right: 10px;
                padding: 10px;
                outline: 0;
              }

              .search--3{
                width: 350px;
                margin-bottom: 20px;
                margin-right: 10px;
                padding: 10px;
                outline: 0;
                margin-left:48px;
              }

        }

        

    }

    @media(max-width: 600px){

        .searchArea{
            flex-direction: column;
            

            .searchArea-1{


                .inputSearch, .search--3 {
                    width:85%;
                    margin-left:0;
                }
                
            
               

            }

        
        }





    }
   

`