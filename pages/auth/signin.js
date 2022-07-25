import { getCsrfToken } from 'next-auth/react';
import { useRouter } from "next/router";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Layout from '../../components/layout';

export default function SignIn({ csrfToken }) {
  const { error } = useRouter().query;
  return (
    <Layout>
      <Form
        method="post"
        action="/api/auth/callback/credentials"
        className="mt-3"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Form.Group as={Row} className="mb-3" controlId="formUsername">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="username" placeholder="Username" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Col>
        </Form.Group>
        <Button type="submit">Sign in</Button>    
        {error && <SignInError error={error} />}
      </Form>
    </Layout>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const token = await getCsrfToken(context)
  return {
    props: {
      csrfToken: token ?? null,
    },
  };
}

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check your login credentials.",
  default: "Unable to sign in.",
};
const SignInError = ({ error = errors.default }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return <div>{errorMessage}</div>;
};
