import prisma from '../app/config/db';
import {
  Role,
  Permission,
  PermissionAssignment,
} from './authentication';

const main = async () => {
  await prisma.user.deleteMany();
  await prisma.permissionRole.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();

  for (const role of Object.values(Role)) {
    await prisma.role.create({
      data: {
        name: role,
      },
    });
  }

  for (const permission of Object.values(Permission)) {
    await prisma.permission.create({
      data: {
        name: permission,
      },
    });
  }

  for (const role in PermissionAssignment) {
    const roleRecord = await prisma.role.findFirst({
      where: {
        name: role,
      },
    });
    for (const permission of PermissionAssignment[role]) {
      const permissionRecord =
        await prisma.permission.findFirst({
          where: {
            name: permission,
          },
        });

      if (roleRecord && permissionRecord) {
        await prisma.permissionRole.create({
          data: {
            role_id: roleRecord.id,
            permission_id: permissionRecord.id,
          },
        });
      }
    }
  }
};

main().catch((e) => {
  throw e;
});
