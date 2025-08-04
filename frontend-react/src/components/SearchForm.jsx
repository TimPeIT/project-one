function SearchForm(){
    return (

        <>
          <div class="container my-4">
    <div class="card p-4 shadow">
      <div class="row g-3">
        <div class="col-md-4">
          <input type="text" class="form-control" placeholder="Gericht oder Land suchen..." />
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control" placeholder="Postleitzahl" />
        </div>
        <div class="col-md-2">
          <input type="number" class="form-control" placeholder="Radius (km)" />
        </div>
        <div class="col-md-2">
          <select class="form-select">
            <option disabled selected>Bewertung</option>
            <option>5 Sterne</option>
            <option>4+ Sterne</option>
            <option>3+ Sterne</option>
          </select>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100">Suchen</button>
        </div>
      </div>
    </div>
  </div>
    </>
    )
}

export default SearchForm;