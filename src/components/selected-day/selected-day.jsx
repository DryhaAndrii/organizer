import React from "react";
import "./selected-day.sass";
import UserMenu from "./UserMenu.jsx";
import TodoList from "./TodoList.jsx";
import AddTodo from "./AddTodo.jsx";
import { useSelectedDay } from "./useSelectedDay";
function SelectedDay(props) {
  const {
    selectedDay,
    business,
    setBusiness,
    addToList,
    removeFromList,
    hasDate,
  } = useSelectedDay({
    externalSelectedDay: props.selectedDay,
    userLogin: props.userLogin,
    setShowMessage: props.setShowMessage,
    setRerenderCalendar: props.setRerenderCalendar,
  });
  return (
    <div className="selected-day-panel">
      <UserMenu
        userLogin={props.userLogin}
        onLogout={() => {
          fetch("/api/logout", { method: "POST" }).finally(() => {
            props.setIsAuthicated(false);
            props.setUserLogin("");
          });
        }}
      />
      {hasDate && (
        <div className="selected-day-info">
          <p>
            {selectedDay.day} {selectedDay.month} {selectedDay.year}
          </p>
          <div className="selected-day-info-todolist">
            {selectedDay.toDoList.length > 0 ? (
              <>
                <TodoList
                  items={selectedDay.toDoList}
                  onRemove={(index) => {
                    removeFromList(
                      selectedDay.day,
                      selectedDay.month,
                      selectedDay.year,
                      index,
                      props.userLogin
                    );
                  }}
                />
                <AddTodo
                  value={business}
                  onChange={(e) => {
                    setBusiness(e.target.value);
                  }}
                  onAdd={() => {
                    addToList(
                      selectedDay.day,
                      selectedDay.month,
                      selectedDay.year,
                      business,
                      props.userLogin
                    );
                  }}
                />
              </>
            ) : (
              <>
                <TodoList items={[]} onRemove={() => {}} />
                <AddTodo
                  value={business}
                  onChange={(e) => {
                    setBusiness(e.target.value);
                  }}
                  onAdd={() => {
                    addToList(
                      selectedDay.day,
                      selectedDay.month,
                      selectedDay.year,
                      business,
                      props.userLogin
                    );
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedDay;
