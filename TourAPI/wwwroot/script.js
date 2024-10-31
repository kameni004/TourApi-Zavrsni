// ** Global Document Ready Function **
$(document).ready(function () {
    const pageId = $('body').attr('id');

    if (pageId === 'indexPage') {
        loadToursListIndex(); // Load tours without action buttons for index.html
    } else if (pageId === 'toursPage') {
        loadBandsDropdown(); // Load bands for the dropdown in tours.html
        loadToursListWithActions(); // Load tours with action buttons for tours.html
        $('#tourForm').on('submit', saveTour);
        $('#cancelTourEdit').on('click', function () {
            $('#tourForm')[0].reset();
            $('#tourId').val('');
        });
    } else if (pageId === 'bandsPage') {
        loadBandsList();
        $('#bandForm').on('submit', saveBand);
        $('#cancelBandEdit').on('click', function () {
            $('#bandForm')[0].reset();
            $('#bandId').val('');
        });
    } else if (pageId === 'manageTourPage') {
        const tourId = new URLSearchParams(window.location.search).get('tourId');
        if (tourId) {
            loadTourDates(tourId);
        } else {
            alert("Nijedna turneja nije odabrana.");
        }
        $('#tourDateForm').on('submit', function (e) {
            e.preventDefault();
            saveTourDate(tourId);
        });
        $('#cancelTourDateEdit').on('click', function () {
            $('#tourDateForm')[0].reset();
            $('#tourDateId').val('');
        });
    }

    // ** Event Handlers for Action Buttons **
    $(document).on('click', '.edit-tour', function () {
        const id = $(this).data('id');
        loadTour(id);
    });

    $(document).on('click', '.delete-tour', function () {
        const id = $(this).data('id');
        deleteTour(id);
    });

    $(document).on('click', '.edit-band', function () {
        const id = $(this).data('id');
        loadBand(id);
    });

    $(document).on('click', '.delete-band', function () {
        const id = $(this).data('id');
        deleteBand(id);
    });

    $(document).on('click', '.edit-tourDate', function () {
        const id = $(this).data('id');
        loadTourDate(id);
    });

    $(document).on('click', '.delete-tourDate', function () {
        const id = $(this).data('id');
        deleteTourDate(id);
    });
});

// ** Tours Functions **
function loadToursListIndex() {
    $.getJSON('/api/Tour', function (tours) {
        const toursTableBody = $('#toursTableBody');
        toursTableBody.empty();
        $.each(tours, function (index, tour) {
            const row = $('<tr></tr>');
            row.append(`<td>${tour.name}</td>`);
            row.append(`<td>${tour.band ? tour.band.name : 'N/A'}</td>`);
            toursTableBody.append(row);
        });
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Greška prilikom učitavanja turneja:", error);
    });
}

function loadToursListWithActions() {
    $.getJSON('/api/Tour', function (tours) {
        const tourTableBody = $('#tourTableBody');
        tourTableBody.empty();
        $.each(tours, function (index, tour) {
            const row = $('<tr></tr>');
            row.append(`<td>${tour.name}</td>`);
            row.append(`<td>${tour.band ? tour.band.name : 'N/A'}</td>`);
            row.append(`<td>
                <a href="manage-tour.html?tourId=${tour.id}">Upravljaj datumima</a> |
                <button class="edit-tour" data-id="${tour.id}">Uredi</button> |
                <button class="delete-tour" data-id="${tour.id}">Obriši</button>
            </td>`);
            tourTableBody.append(row);
        });
    }).fail(function () {
        alert('Greška prilikom učitavanja turneja.');
    });
}

function loadTour(id) {
    $.getJSON(`/api/Tour/${id}`, function (tour) {
        $('#tourId').val(tour.id);
        $('#tourName').val(tour.name);
        $('#bandId').val(tour.bandId);
        $('#description').val(tour.description);
    }).fail(function () {
        alert('Greška prilikom učitavanja turneje.');
    });
}

function saveTour(event) {
    event.preventDefault();
    const tourId = $('#tourId').val();
    const isUpdate = !!tourId;

    const tour = {
        name: $('#tourName').val(),
        bandId: $('#bandId').val(),
        description: $('#description').val()
    };

    if (isUpdate) {
        tour.id = tourId;
    }

    const requestType = isUpdate ? 'PUT' : 'POST';
    const requestUrl = isUpdate ? `/api/Tour/${tourId}` : '/api/Tour';

    $.ajax({
        url: requestUrl,
        type: requestType,
        contentType: 'application/json',
        data: JSON.stringify(tour),
        success: function () {
            alert('Turneja je uspješno spremljena.');
            $('#tourForm')[0].reset();
            $('#tourId').val('');
            loadToursListWithActions();
        },
        error: function () {
            alert('Greška prilikom spremanja turneje.');
        }
    });
}

function deleteTour(id) {
    $.ajax({
        url: `/api/Tour/${id}`,
        type: 'DELETE',
        success: function () {
            alert('Turneja je uspješno obrisana.');
            loadToursListWithActions();
        },
        error: function () {
            alert('Greška prilikom brisanja turneje.');
        }
    });
}

// ** Bands Functions **
function loadBandsList() {
    $.getJSON('/api/Band', function (bands) {
        const bandTableBody = $('#bandTableBody');
        bandTableBody.empty();
        $.each(bands, function (index, band) {
            const row = $('<tr></tr>');
            row.append(`<td>${band.name}</td>`);
            row.append(`<td>
                <button class="edit-band" data-id="${band.id}">Uredi</button> |
                <button class="delete-band" data-id="${band.id}">Obriši</button>
            </td>`);
            bandTableBody.append(row);
        });
    }).fail(function () {
        alert('Greška prilikom učitavanja bendova.');
    });
}

function loadBand(id) {
    $.getJSON(`/api/Band/${id}`, function (band) {
        $('#bandId').val(band.id);
        $('#bandName').val(band.name);
        $('#bandDescription').val(band.description);
        $('#bandGenre').val(band.genre);
    }).fail(function () {
        alert('Greška prilikom učitavanja benda.');
    });
}

function saveBand(event) {
    event.preventDefault();
    const bandId = $('#bandId').val();
    const isUpdate = !!bandId;

    const band = {
        name: $('#bandName').val(),
        description: $('#bandDescription').val(),
        genre: $('#bandGenre').val()
    };

    if (isUpdate) {
        band.id = bandId;
    }

    const requestType = isUpdate ? 'PUT' : 'POST';
    const requestUrl = isUpdate ? `/api/Band/${bandId}` : '/api/Band';

    $.ajax({
        url: requestUrl,
        type: requestType,
        contentType: 'application/json',
        data: JSON.stringify(band),
        success: function () {
            alert('Bend je uspješno spremljen.');
            $('#bandForm')[0].reset();
            $('#bandId').val('');
            loadBandsList();
        },
        error: function () {
            alert('Greška prilikom spremanja benda.');
        }
    });
}

function deleteBand(id) {
    $.ajax({
        url: `/api/Band/${id}`,
        type: 'DELETE',
        success: function () {
            alert('Bend je uspješno obrisan.');
            loadBandsList();
        },
        error: function () {
            alert('Greška prilikom brisanja benda.');
        }
    });
}

// ** Bands Dropdown for Tours **
function loadBandsDropdown() {
    $.getJSON('/api/Band', function (bands) {
        const bandSelect = $('#bandId');
        bandSelect.empty();
        bandSelect.append('<option value="">Odaberi bend</option>');
        $.each(bands, function (index, band) {
            bandSelect.append(`<option value="${band.id}">${band.name}</option>`);
        });
    }).fail(function () {
        alert('Greška prilikom učitavanja bendova.');
    });
}

// ** TourDates Functions **
function loadTourDates(tourId) {
    $.getJSON(`/api/Tour/${tourId}`, function (tour) {
        $('#tourNameDisplay').text(tour.name);
        const tourDatesTableBody = $('#tourDatesTableBody');
        tourDatesTableBody.empty();
        $.each(tour.tourDates, function (index, tourDate) {
            const row = $('<tr></tr>');
            row.append(`<td>${new Date(tourDate.date).toLocaleDateString()}</td>`);
            row.append(`<td>${tourDate.venue || 'N/A'}</td>`);
            row.append(`<td>${tourDate.city}</td>`);
            row.append(`<td>
                <button class="edit-tourDate" data-id="${tourDate.id}">Uredi</button> |
                <button class="delete-tourDate" data-id="${tourDate.id}">Obriši</button>
            </td>`);
            tourDatesTableBody.append(row);
        });
    }).fail(function () {
        alert('Greška prilikom učitavanja datuma turneje.');
    });
}

function loadTourDate(id) {
    $.getJSON(`/api/TourDate/${id}`, function (tourDate) {
        $('#tourDateId').val(tourDate.id);
        $('#tourDate').val(new Date(tourDate.date).toISOString().split('T')[0]);
        $('#venue').val(tourDate.venue);
        $('#city').val(tourDate.city);
    }).fail(function () {
        alert('Greška prilikom učitavanja podataka o datumu turneje.');
    });
}

function saveTourDate(tourId) {
    const tourDateId = $('#tourDateId').val();
    const isUpdate = !!tourDateId;

    const tourDate = {
        tourId: tourId,
        date: $('#tourDate').val(),
        venue: $('#venue').val(),
        city: $('#city').val()
    };

    if (isUpdate) {
        tourDate.id = tourDateId;
    }

    const requestType = isUpdate ? 'PUT' : 'POST';
    const requestUrl = isUpdate ? `/api/TourDate/${tourDateId}` : '/api/TourDate';

    $.ajax({
        url: requestUrl,
        type: requestType,
        contentType: 'application/json',
        data: JSON.stringify(tourDate),
        success: function () {
            alert('Datum turneje je uspješno spremljen.');
            $('#tourDateForm')[0].reset();
            $('#tourDateId').val('');
            loadTourDates(tourId);
        },
        error: function () {
            alert('Greška prilikom spremanja datuma turneje.');
        }
    });
}

function deleteTourDate(id) {
    const tourId = new URLSearchParams(window.location.search).get('tourId');
    $.ajax({
        url: `/api/TourDate/${id}`,
        type: 'DELETE',
        success: function () {
            alert('Datum turneje je uspješno obrisan.');
            loadTourDates(tourId);
        },
        error: function () {
            alert('Greška prilikom brisanja datuma turneje.');
        }
    });
}
