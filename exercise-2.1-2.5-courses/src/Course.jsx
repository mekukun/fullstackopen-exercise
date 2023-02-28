import Total from "./Total";
import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content materials={course.parts} />
      <Total materials={course.parts} />
    </div>
  );
};

export default Course;
