import Form from "./userRegister";
const Register = () => {
  return (
    <div>
    <div className='flex justify-center py-8' >
      <h1 className="text-2xl">Cadastrar novo familiar</h1>
      </div>
       <div className='flex justify-center py-28'>
      <Form />
          </div>
    </div>
  );
};

export default Register;
