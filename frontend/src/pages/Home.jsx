import { Link, useLocation } from "react-router-dom";

function Home() {
  const params = useLocation();
  const pathName = params.pathname;

  return (
    <section className="home">
      <div className="btns">
        {[
          { to: "/auth/register", name: "Register" },
          { to: "/auth/login", name: "Login" },
        ].map((obj, index) => (
          <Link
            key={index}
            to={obj.to}
            style={{
              background: `${obj.to == pathName ? "var(--bg-color-20)" : ""}`,
            }}>
            {obj.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Home;
