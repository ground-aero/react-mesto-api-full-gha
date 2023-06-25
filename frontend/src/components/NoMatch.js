import React from 'react';

export const NoMatch = () => {//получаем компонент(ы), которые переданы через пропс element
    return (
        <section className="entry">
            <div className="page__notfound">Page not found</div>
        </section>
    )
}