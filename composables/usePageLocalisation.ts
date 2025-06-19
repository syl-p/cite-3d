import * as THREE from "three";
import { computed } from "vue";

export default (loaded: Ref<Boolean>) => {
  const currentPosition = ref(new THREE.Vector3());
  const currentLookAt = ref(new THREE.Vector3());
  const { camera, scene, controls } = useTresContext();
  const { page } = useContent();
  const applicationStore = useApplicationStore()
  const {state} = storeToRefs(applicationStore)

  let previousPosition = ref(new THREE.Vector3());
  let previousLookAt = ref(new THREE.Vector3());

  function calculateOffset(
    targetPosition: THREE.Vector3,
    offset: THREE.Vector3
  ) {
    const idealOffset = offset.clone();
    idealOffset.add(targetPosition);
    return idealOffset;
  }

  const initialLookAt = computed(() => {
    switch (state.value) {
      case 'intro':
        return new THREE.Vector3(0, 1, 0)
        break;
      default:
        return new THREE.Vector3(0, 0, 0)
        break;
    }
  })

  const initialOffset = computed(() => {
    switch (state.value) {
      case 'intro':
        return new THREE.Vector3(3.5, -0.1, 0)
        break;
      default:
        return new THREE.Vector3(2.5, 3, -2)
        break;
    }
  })

  const currentPart = computed(() => {
    let targetedPosition = initialLookAt.value;

    if (!scene.value || !page.value || !page.value.object_name) return targetedPosition;

    scene.value.traverse((obj) => {
      if (obj.name === page.value.object_name) {
        obj.getWorldPosition(targetedPosition);
      }
    });

    return targetedPosition;
  });

  const currentPartOffset = computed(() => {
    return page.value && page.value.offset
      ? new THREE.Vector3(
          page.value.offset[0],
          page.value.offset[1],
          page.value.offset[2]
        )
      : initialOffset.value;
  });

  const { onLoop } = useRenderLoop();

  onLoop(({ delta }) => {
    if (camera && camera.value && state && state.value && loaded.value) {
        let idealOffset = calculateOffset(
          currentPart.value,
          currentPartOffset.value
        );

        // UPDATE Cam position / targeting
        currentPosition.value.lerp(idealOffset, delta);
        currentLookAt.value.lerp(currentPart.value, delta);
        camera.value.position.copy(currentPosition.value);
        camera.value.lookAt(currentLookAt.value);

        if (controls.value)
          //@ts-ignore
          controls.value.target.lerp(currentLookAt.value, delta);

        const positionReached =
          currentPosition.value.distanceTo(idealOffset) < 0.1;
        const lookAtReached =
          currentLookAt.value.distanceTo(currentPart.value) < 0.1;

        if (positionReached && lookAtReached) {
          previousPosition.value = currentPosition.value.clone();
          previousLookAt.value = previousLookAt.value.clone();
        }
    }
  });
};
