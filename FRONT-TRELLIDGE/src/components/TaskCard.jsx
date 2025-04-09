import { useDrag } from 'react-dnd';

const TaskCard = ({ task, moveTask }) => {
  // Usamos el hook useDrag para hacer que la tarea sea arrastrable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',  // Tipo de objeto que estamos arrastrando
    item: { id: task._id },  // Identificador único de la tarea
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),  // Si está siendo arrastrada
    }),
  }));

  return (
    <div
      ref={drag}  // Esto hace que el div sea el área que se puede arrastrar
      className={`p-2 m-2 bg-white rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : ''  // Aplica estilo cuando está siendo arrastrada
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}  // Ajuste de la opacidad durante el arrastre
    >
      {task.title}  {/* Muestra el título de la tarea */}
    </div>
  );
};

export default TaskCard;
