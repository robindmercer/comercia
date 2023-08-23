import { useEffect, useState } from "react";

const Pagination = ({
  pages,
  setCurrentPage,
  currentTicketOC,
  sortedTicket,
}) => {
  const numOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  return (
      <div className="clearfix">
        <div className="hint-text">
          Mostrando <b>{currentTicketOC.length}</b> de cada{" "}
          <b>{sortedTicket.length}</b> registros
        </div>
        <ul className="pagination">&nbsp;&nbsp;
          <li
            className={`${
              currentButton === 1 ? "page-item disabled" : "page-item"
            }`}
          >
            <a
              href="#!"
              onClick={() =>
                setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
              }
            >
              Anterior
            </a>
          </li>&nbsp;&nbsp;
          {numOfPages.map((page, index) => {
            return (
              <li
                key={index}
                className={`${
                  currentButton === page ? "page-item active" : "page-item"
                }`}
              >
                <a
                  href="#!"
                  className="page-link"
                  onClick={() => setCurrentButton(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
 &nbsp;&nbsp;
          <li
            className={`${
              currentButton === numOfPages.length
                ? "page-item disabled"
                : "page-item"
            }`}
          >
            <a
              href="#!"
              onClick={() =>
                setCurrentButton((next) =>
                  next === numOfPages.length ? next : next + 1
                )
              }
            >
             Siguiente
            </a>
          </li>&nbsp;&nbsp;
        </ul>
      </div>
    );

};

export default Pagination;
