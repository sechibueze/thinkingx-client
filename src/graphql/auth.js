import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation UserSignup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      disabled
      displayName
      email
      phoneNumber
    }
  }
`;
