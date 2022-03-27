import { Link, useNavigate } from "react-router-dom";
import { MdWorkOutline, MdPerson } from "react-icons/md";
import Box from "../../components/Box";
import Text from "../../components/Text";
import Input from "../../components/Input";
import {
  ArrowBack,
  GoBackText,
  Form,
  InputsGrid,
  ResponsiveText,
  TopWrapper,
  SwitchContainer,
  View,
} from "./styled";
import { StyledButton, RegisterWrapper } from "./styled";
import { useState, useContext } from "react";
import CardButton from "../../components/CardButton";
import { authSession, registerCandidate, registerCompany } from "../../api";
import { useForm } from "react-hook-form";
import Context from "../../Context";
import { DEFAULT_ERROR } from "../../constants/feedbacks";

const Signup = () => {
  const { setFeedback, loadUser } = useContext(Context);
  const [isActiveCandidate, setIsActiveCandidate] = useState(true);
  const isActiveCompany = !isActiveCandidate;
  const placeholder = isActiveCandidate ? "Full name" : "Fiscal name";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickCandidate = () => {
    setIsActiveCandidate(true);
  };

  const handleClickCompany = () => {
    setIsActiveCandidate(false);
  };

  const submit = async (values) => {
    const { name, email, password, location, phone } = values;
    try {
      if (isActiveCandidate) {
        await registerCandidate(name, email, password, location, phone);
      } else {
        await registerCompany(name, email, password, location, phone);
      }
      await authSession(email, password);
      await loadUser();
      setFeedback({
        message: "User successfully registered.",
        level: "success",
      });
      navigate("/");
    } catch (error) {
      setFeedback(DEFAULT_ERROR);
    }
  };

  return (
    <View>
      <Box
        justifyContent="space-evently"
        flexDirection="column"
        alignItems="center"
      >
        <TopWrapper flexDirection="column">
          <GoBackText forwardedAs={Link} to="/login" variant="link">
            <ArrowBack />
            Go back to login
          </GoBackText>
        </TopWrapper>
        <RegisterWrapper
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          gap="40px"
        >
          <Box
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            marginBottom="8px"
            gap="12px"
          >
            <Text variant="heading" textAlign="center">
              Welcome to Jobly
            </Text>
            <ResponsiveText>
              We are almost done! Please fill in some data
            </ResponsiveText>
          </Box>
          <SwitchContainer>
            <CardButton
              onClick={handleClickCandidate}
              isActive={isActiveCandidate}
              icon={<MdPerson />}
            >
              I'm a Candidate
            </CardButton>
            <CardButton
              onClick={handleClickCompany}
              isActive={isActiveCompany}
              icon={<MdWorkOutline />}
            >
              I'm a Company
            </CardButton>
          </SwitchContainer>
          <Box
            justifyContent="center"
            gap="24px"
            flexDirection="column"
            alignItems="center"
          >
            <Form onSubmit={handleSubmit(submit)}>
              <Input
                {...register("name", { required: "This field is required" })}
                placeholder={placeholder}
                error={errors.name?.message}
              />
              <InputsGrid>
                <Input
                  {...register("location", {
                    required: "This field is required",
                  })}
                  placeholder="Location"
                  error={errors.location?.message}
                />
                <Input
                  {...register("phone", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9\s]*$/,
                      message: "Enter a valid phone",
                    },
                  })}
                  type="tel"
                  placeholder="Phone"
                  error={errors.phone?.message}
                />
              </InputsGrid>
              <Input
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="Email"
                error={errors.email?.message}
              />
              <Input
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
              />
              <Box>
                <StyledButton>Sign Up</StyledButton>
              </Box>
            </Form>
          </Box>
        </RegisterWrapper>
      </Box>
    </View>
  );
};

export default Signup;
