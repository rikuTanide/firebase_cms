cd functions
call tsc index.ts render/index.tsx --lib es2015 --jsx react
call node index.js
cd ..