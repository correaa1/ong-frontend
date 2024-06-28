import {  extendTheme } from '@chakra-ui/react';
const config = {
    initialColorMode: 'light',

}
const theme = extendTheme({
    config,
   
    styles: {
  
        global:(props) => ( {

            body: {
                fontFamily: ' "Segoe UI", Roboto,  sans-serif',
                sidebar: 'Roboto, sans-serif',
                fontWeight:'400',

            },


            'html': {
                fontSize: '16px',
                '@media screen and (max-width: 768px)': {
                    fontSize: '12px',
                },
                '@media screen and (min-width: 768px) and (max-width: 1440px)': {
                    fontSize: '14px',
                },

            }
            
        }),
        },


});

export default theme;
