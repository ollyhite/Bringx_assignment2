import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const url = process.env.REACT_APP_SERVER;
    try {
      const response = await axios.get(`${url}:8081/emails`, {
        to: data.toEmail,
        subject: data.subject,
        body: data.body,
      });
      console.log("response", response);
      if (response.data) {
        const data = response.data;
        console.log("response.data", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Email to</h4>
          <input {...register("toEmail")} />
          <h4>Email to</h4>
          <input {...register("subject")} />
          <h4>Email to</h4>
          <textarea {...register("body")} />
          <input className="button" type="submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
