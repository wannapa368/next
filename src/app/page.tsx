import PortfolioForm from "./components/PortfolioForm";
import StudentDetail from "./components/StudentDetail";
import StudentTable from "./components/StudentTable";

export default function Page() {
  return (
    <div>
      <PortfolioForm />
      <StudentTable />
      <StudentDetail photoUrl="some-photo-url" />
    </div>
  );
}
