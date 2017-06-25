import * as React from 'react';
import {renderToString} from 'react-dom/server';

export class IndexComponent extends React.Component<Articles, {}> {
    render() {
        let props = this.props as Articles;
        props.tech_reviews.sort((a, b) => a > b ? -1 : 1);
        let tech_reviews = props.tech_reviews.map(t => {
            return <li key={t.id}><a href={"/tech_reviews/" + t.id}>{t.title}</a></li>
        });
        let book_reviews = props.book_reviews.map(b => {
            return <li key={b.id}><a href={"/book_reviews/" + b.id}>{b.title}</a></li>
        });

        return <div>
            <h1>弩ブログ</h1>
            <h2>記事一覧</h2>
            <dl>
                <dt>技術評論</dt>
                <dd>
                    <ul>{tech_reviews}</ul>
                </dd>
            </dl>
            <dl>
                <dt>書籍評論</dt>
                <dd>
                    <ul>{book_reviews}</ul>
                </dd>
            </dl>
        </div>;
    }

    static toString(articles: Articles): string {
        return renderToString(<IndexComponent {...articles}/>)
    }

}

export class TechReviewComponent extends React.Component<TechReview, {}> {
    render() {
        let props = this.props as TechReview;
        return <div>
            <a href="/"><h1>弩ブログ {props.title}</h1></a>
            <div dangerouslySetInnerHTML={{__html: props.body}}/>
            <time>{props.datetime}</time>
        </div>;
    }

    static toString(article: TechReview): string {
        return renderToString(<TechReviewComponent {...article}/>)
    }

}

export interface TechReview {
    id: string, datetime: string, title: string, body: string,
}

export interface BookReviews {
    id: string, datetime: string, title: string, body: string,
}

export interface Articles {
    tech_reviews: TechReview[];
    book_reviews: BookReviews[];
}