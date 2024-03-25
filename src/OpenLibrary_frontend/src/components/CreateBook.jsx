import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react";

const CreateBook = () => {
  const [bookICP] = useCanister("OpenLibrary_backend");
  const [loading, setLoading] = useState("");

  const saveBook = async (e) => {
    e.preventDefault();
    var book = e.target[0].value;
    //console.log(book);

    setLoading("Loading...");

    await bookICP.CreateBook(book);
    setLoading("");
    
    {
      document.getElementById('btnListBook').click();
    }
  }

  return (
    <div className="row mt-5">
      <div className="col">
        {
          loading != "" ? <div className="alert alert-primary">{loading}</div> : <div></div>
        }

        <div class="card">
          <div class="card-header">
            Crear un libro
          </div>

          <div class="card-body">
            <form class="form" onSubmit={ saveBook }>
              <div class="mb-3">
                <label for="title" class="form-label">Nombre del Libro</label>
                <input type="text" class="form-control" id="title" placeholder="Ej. Frankenstein"/>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Descripcion</label>
                <input type="text" class="form-control" id="description" placeholder="Ej. Novela Gotica"/>
              </div>

              <input type="submit" class="btn btn-success" value="Crear"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBook