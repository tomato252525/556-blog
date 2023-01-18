import Head from 'next/head'
import { client } from '@/libs/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// SSG
export const getStaticProps = async() => {
  const data = await client.get({ endpoint: "blog" });
  const createDate = data.contents.map((content) => 
    new Date(Date.parse(content.publishedAt)+32400000)
    .toLocaleDateString('ja-JP')
    .replace(/\//g, '/')
  );

  return {
    props: {
      blog: data.contents,
      createDate,
    },
  };
};

export default function Home({ blog, createDate }) {
  var i = 0;
  return (
    <div className="container">
      <Head>
        <title>556相談室 BLOG</title>
      </Head>
      <Navbar className="center">
        <Container>
          <Nav className="ms-auto">
            <Nav.Link className="me-3" href="./consultation">お悩み相談フォーム</Nav.Link>
            <Nav.Link href="https://twitter.com/556soudansitu" target="_blank">Twitter</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1 className="text-center py-5">556相談室 BLOG</h1>
      <ul className="list-group">
        { blog.map((blog) => (
          <a key={blog.id} href={`blog/${blog.id}`} className="list-group-item list-group-item-action list d-flex justify-content-between">
            <div>{blog.title}</div>
            <div>{createDate[i++]}</div>
          </a>
        ))}
      </ul>
    </div>
  );
}