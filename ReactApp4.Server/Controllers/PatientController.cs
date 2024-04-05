using CMH.ExerciseProject.Server.Database;
using CMH.ExerciseProject.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace CMH.ExerciseProject.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PatientController : ControllerBase
    {
        private IPatientDataLayer _patientDataLayer {  get; set; }

        public PatientController(IPatientDataLayer patientDataLayer)
        {
            _patientDataLayer = patientDataLayer;
        }

        [HttpGet]
        [Route("{name}")]
        public async Task<IEnumerable<Patient>> SearchPatients(string name)
        {
            return await _patientDataLayer.SearchPatients(name);
        }

        [HttpGet]
        public async Task<IEnumerable<Patient>> GetPatients()
        {
            return await _patientDataLayer.GetPatients();
        }

        [HttpPost]
        public async Task<int> AddPatient(Patient patient)
        {
            return await _patientDataLayer.AddPatient(patient);
        }

        [HttpDelete]
        [Route("{patientId}")]
        public async Task<int> DeletePatient(int patientId)
        {
            return await _patientDataLayer.DeletePatient(patientId);
        }
    }
}
