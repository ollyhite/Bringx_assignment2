import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const url = process.env.REACT_APP_SERVER
      ? process.env.REACT_APP_SERVER
      : `http://localhost:8082`;
    try {
      const response = await axios.post(`${url}/emails`, {
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
          <input
            {...register("toEmail", {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          {errors.toEmail && <p role="alert">{errors.toEmail.message}</p>}
          <h4>Email Subject</h4>
          <input
            {...register("subject", { required: "Email Subject is required" })}
          />
          {errors.subject && <p role="alert">{errors.subject.message}</p>}

          <h4>Email body</h4>
          <textarea
            {...register("body", {
              required: "Body info is required",
            })}
          />
          {errors.body && <p role="alert">{errors.body.message}</p>}

          <input className="button" type="submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
