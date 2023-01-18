import Head from 'next/head'
import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// SSG
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({endpoint: "blog", contentId: id});
    const createDate = new Date(Date.parse(data.publishedAt)+32400000)
    .toLocaleDateString('ja-JP')
    .replace(/\//g, '/');

    return {
        props: {
            blog: data,
            createDate,
        },
    };
};

export const getStaticPaths = async() => {
    const data = await client.get({endpoint: "blog"});
    const paths = data.contents.map((content) => `/blog/${content.id}`);

    return {
        paths,
        fallback: false,
    };
};

export default function BlogId({ blog, createDate }) {
    return (
        <div className="container">
            <Head>
                <title>556相談室 BLOG</title>
            </Head>
            <Navbar className="center">
                <Container>
                <Navbar.Brand href="../">←Home</Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link className="me-3" href="../consultation">お悩み相談フォーム</Nav.Link>
                    <Nav.Link href="https://twitter.com/556soudansitu" target="_blank">Twitter</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <main className={styles.main}>
                <h1 className={styles.title}>{blog.title}</h1>
                <p className={styles.publishedAt}>{createDate}</p>
                <div dangerouslySetInnerHTML={{__html: `${blog.body}`}} className={styles.post}></div>

                <a className="btn btn-outline-dark btn-sm my-5" href="../">戻る</a>
            </main>
        </div>
    )
}