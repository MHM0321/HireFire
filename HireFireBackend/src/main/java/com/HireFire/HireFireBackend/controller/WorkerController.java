@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    @GetMapping("/{id}")
    public ResponseEntity<Worker> getWorker(@PathVariable Long id) {
        Worker worker = workerService.getWorkerById(id);
        return ResponseEntity.ok(worker);
    }

    @PutMapping("/{id}/location")
    public ResponseEntity<Worker> updateLocation(
            @PathVariable Long id,
            @RequestParam String location) {
        Worker worker = workerService.updateLocation(id, location);
        return ResponseEntity.ok(worker);
    }

    @GetMapping("/{id}/appointments/pending")
    public ResponseEntity<List<Appointment>> getPendingAppointments(@PathVariable Long id) {
        List<Appointment> appointments = workerService.getPendingAppointments(id);
        return ResponseEntity.ok(appointments);
    }
}