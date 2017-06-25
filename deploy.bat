cd functions
call tsc index.ts render/index.tsx --lib es2015 --jsx react
cd ..
firebase deploy