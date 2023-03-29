import styled from "styled-components";




export const PageArea = styled.div`
    .card1, .card2, .card3{

        position: absolute;
        top: 30px;
        left: -230px;
        font-size: 58px;
        font-weight: bold;
        
    }
 
    @media(max-width: 600px){
        .card1, .card2, .card3{
            
            position: absolute;
            top: 30px;
            left: -200px;
            font-size: 50px;
        } 
    }

`